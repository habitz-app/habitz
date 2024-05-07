import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|oauth|login|_next/static|_next/image|favicon.ico).*)'],
};

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get('accessToken');
  console.log('current token:', token);
  console.log('call middleware from: ', req.url);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
};
