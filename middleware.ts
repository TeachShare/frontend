import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token_cookie");

  const isVerified = request.cookies.get("is_verified")?.value === "true";
  const verifToken = request.cookies.get("verif_token")?.value;

  const { pathname } = request.nextUrl;

  // If user has a token and is verified, don't let them go to /auth
  if (token && isVerified && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedRoutes = [
    "/dashboard",
    "/community",
    "/generator",
    "/messages",
    "/repository",
    "/resources",
    "/settings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If trying to access a protected route without being logged in
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth?view=login", request.url));
  }

  // If logged in but NOT verified, and trying to access protected content
  if (token && !isVerified && isProtectedRoute) {
    if (!pathname.startsWith("/verification")) {
      const target = verifToken
        ? `/verification/${verifToken}`
        : "/auth?view=login"; // This might still loop if /auth redirects to dashboard
      return NextResponse.redirect(new URL(target, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logos|$).*)"],
};
