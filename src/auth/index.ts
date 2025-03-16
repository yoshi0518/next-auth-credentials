import type { NextAuthConfig, User } from 'next-auth';
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
            }
          : null;
      },
    }),
  ],

  // 認証APIのベースパス
  basePath: BASE_PATH,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
