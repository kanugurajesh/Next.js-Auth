import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // get the path from the request
    const path = request.nextUrl.pathname;

    // check if the path is public
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

    // get the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    // if the path is public and token is found redirect to home page
    if(isPublicPath && token) return NextResponse.redirect(new URL('/',request.nextUrl));

    // if the path is not public and no token is found redirect to login page
    if(!isPublicPath && !token) return NextResponse.redirect(new URL('/login',request.nextUrl));
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}