'use client';

import type { LoginFormData } from '@/app/_actions';
import { useActionState } from 'react';
import { loginAction } from '@/app/_actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Page: React.FC = () => {
  const initialState = {
    errors: {},
    message: '',
  } satisfies LoginFormData;

  const [state, dispatch] = useActionState(loginAction, initialState);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className="text-red-500">{state.message}</div>
        <form
          className="space-y-4"
          action={dispatch}
        >
          <div className="space-y-2">
            <Label htmlFor="id">ユーザーID</Label>
            <Input
              id="id"
              name="id"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              name="password"
              type="password"
            />
          </div>

          <Button type="submit">ログイン</Button>
        </form>
      </div>
    </main>
  );
};
export default Page;
