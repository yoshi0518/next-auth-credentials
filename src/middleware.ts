import { auth } from '@/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest).*)'],
};

// src/auth.tsのauthorized callbackへ転送してログイン認証
export default auth;
