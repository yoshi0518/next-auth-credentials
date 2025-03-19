'use server';

import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export type LoginFormData = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  value?: {
    name?: string;
    email?: string;
    password?: string;
  };
  message?: string;
};

export const loginAction = async (_state: LoginFormData, formData: FormData) => {
  try {
    await signIn('credentials', formData);
    return { message: 'success' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.error('Signin error:', error);
          return { message: 'ユーザーIDまたはパスワードが間違っています' };
      }
    }

    // リダイレクトエラーの場合はリダイレクト
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      redirect('/login');
    }
    return {
      message: 'An unexpected error occurred during signin',
    };
  }
};

export const logoutAction = async () => await signOut();
