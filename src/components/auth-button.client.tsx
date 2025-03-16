'use client';

import { signIn, signOut } from '@/auth/helpers';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export const AuthButtonClient: React.FC = () => {
  const session = useSession();

  console.log('AuthButtonClient', session);

  return session?.data?.user ? (
    <Button
      className="cursor-pointer"
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      SignOut
    </Button>
  ) : (
    <Button
      className="cursor-pointer"
      onClick={async () => await signIn()}
    >
      SignIn
    </Button>
  );
};
