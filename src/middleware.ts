import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const publicPaths = ['/', '/signin', '/signup'];

//   const isPublicPath = publicPaths.includes(path);

//   const token = request.cookies.get('token')?.value || '';

//   console.log('Path:', path);
//   console.log('Is Public Path:', isPublicPath);

//   if (token && isPublicPath) {
//       return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    
//   }

//   if (!token && !isPublicPath) {
//     return NextResponse.redirect(new URL('/', request.nextUrl));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/signin',
    '/signup',
  ],
};
