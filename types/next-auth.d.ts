import type { DefaultSession, User as DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    text?: string;
    user?: {
      text?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    authorize: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    text?: string;
    user?: User;
  }
}
