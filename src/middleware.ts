import { NextResponse } from 'next/server';
import { auth, BASE_PATH } from '@/auth';

// api, _next/static, _next/image, favicon.ico以外のアクセスであればmiddlewareを通す
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
  // 未認証の場合はサインインページへリダイレクト
  const reqUrl = new URL(req.url);

  if (!req.auth && reqUrl.pathname !== '/') {
    return NextResponse.redirect(
      new URL(`${BASE_PATH}/signin?callbackURL=${encodeURIComponent(reqUrl.pathname)}`, reqUrl),
    );
  }
});
