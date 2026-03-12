import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const token = request.cookies.get('access_token_cookie');
    const { pathname } = request.nextUrl

    if(token && (pathname === '/login' || pathname === '/auth')){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    const protectedRoutes = [
        '/dashboard', 
        '/community', 
        '/generator', 
        '/messages', 
        '/repository', 
        '/resources', 
        '/settings'
    ];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    if(!token && isProtectedRoute){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logos|login|register|$).*)',
  ],
}