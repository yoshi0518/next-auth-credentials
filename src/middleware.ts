import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { env } from '@/env';

const UNAUTHENTICATED_PAGE_LIST = ['/login', '/logout', '/reset'];

export const config = {
  matcher: [
    '/((?!_next|sign-in|sign-up|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

export default auth(async (req) => {
  console.log('[middleware]');
  const { auth, nextUrl } = req;
  const isAuthenticated = !!auth;
  const isUnAuthenticatedPage = UNAUTHENTICATED_PAGE_LIST.includes(nextUrl.pathname);
  console.log({ isAuthenticated, isUnAuthenticatedPage });

  // 認証済でログイン関連ページを指定 => HOMEへリダイレクト
  if (isAuthenticated && isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/', `${env.BASE_URL_APP}`));
  }

  // 未認証でログイン関連ページ以外を指定 => ログインページへリダイレクト
  if (!auth && !isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/login', `${env.BASE_URL_APP}`));
  }
});
