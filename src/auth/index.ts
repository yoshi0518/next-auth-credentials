import type { NextAuthConfig, User } from 'next-auth';
import { env } from '@/env';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth';

const authConfig: NextAuthConfig = {
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
        console.log('authorize', id, password);
        // ダミーユーザー情報
        const users = [
          {
            id: 'test1',
            name: 'test1',
            password: 'password1',
            email: 'test1@example.com',
          },
          {
            id: 'test2',
            name: 'test2',
            password: 'password2',
            email: 'test2@example.com',
          },
        ];

        // ユーザー情報の検索
        const user = users.find((user) => user.id === id && user.password === password);

        return user
          ? {
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password,
              authorize: 'aaa',
            }
          : null;
      },
    }),
  ],

  trustHost: true,
  basePath: BASE_PATH,
  debug: Boolean(env.DEBUG),
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('[callbacks] jwt');
      console.log({ token });
      console.log({ user });
      token.text = 'test';
      return token;
    },

    session: async ({ session, token }) => {
      console.log('[callbacks] session');
      console.log({ session });
      console.log({ token });

      session.text = token.text;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
