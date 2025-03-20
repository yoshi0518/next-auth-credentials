import type { NextAuthConfig, User } from 'next-auth';
import type { ExtendedUser } from 'types/next-auth';
import { fetchLoginAction } from '@/app/_actions';
import { env } from '@/env';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth';

const authConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      // ログイン認証フォームのフィールド
      credentials: {
        id: {
          label: 'User ID',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // 認証処理
      authorize: async ({ id, password }): Promise<User | null> => {
        if (typeof id !== 'string') return null;
        if (typeof password !== 'string') return null;

        const response = await fetchLoginAction({ id, password });

        if (!response.ok) return null;

        const user = (await response.json()) as ExtendedUser;

        // アクセストークン、リフレッシュトークンの有効期限を過ぎたら再取得
        return user;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  trustHost: true,
  basePath: BASE_PATH,
  debug: Boolean(env.DEBUG),
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // JWTの作成(ログイン時など)、更新(クライアントからのセッション利用時など)のタイミングに実行される
    // ここでreturnされた情報がJWTに保存され，session callbackに転送される
    async jwt({ token, user }) {
      console.log('[callbacks] jwt');
      console.log({ token });
      console.log({ user });

      if (typeof token.access_token === 'string') {
        console.log({ access_token: token.access_token, decoded: jwtDecode(token.access_token) });
      }

      if (typeof token.refresh_token === 'string') {
        console.log({ refresh_token: token.refresh_token, decoded: jwtDecode(token.refresh_token) });
      }

      return { ...token, ...user };
    },

    // useSessionやgetSessionのセッション確認時に実行される
    // ここでreturnされた情報がクライアントに公開される(パスワードなどの機密情報を保存しないように注意)
    // 「strategy: jwt」の場合はtoken引数、「strategy: database」の場合はuser引数が利用可能
    async session({ session, token }) {
      // console.log('[callbacks] session');
      // console.log({ session });
      // console.log({ token });

      session.user = {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        token_type: token.token_type,
        id: token.id,
        user_id: token.user_id,
        name: token.name,
        name_s: token.name_s,
        email: token.email,
        tanto_no: token.tanto_no,
        pc_name: token.pc_name,
        password_status_no: token.password_status_no,
        emailVerified: null,
      } as ExtendedUser;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { signIn, signOut, auth } = NextAuth(authConfig);
