import { auth, BASE_PATH } from '@/auth';
import { SessionProvider } from 'next-auth/react';

import { AuthButtonClient } from './auth-button.client';

export const AuthButtonServer: React.FC = async () => {
  const session = await auth();

  console.log('AuthButtonServer', session);

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider
      basePath={BASE_PATH}
      session={session}
    >
      <AuthButtonClient />
    </SessionProvider>
  );
};
