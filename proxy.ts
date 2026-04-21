import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token_cookie");

  const isVerified = request.cookies.get("is_verified")?.value === "true";
  const verifHash = request.cookies.get("verif_hash")?.value;

  const { pathname } = request.nextUrl;

  if (token && (pathname === "/auth" || pathname === "/auth")) {
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

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth?view=login", request.url));
  }

  if (token && !isVerified && isProtectedRoute) {
    if (!pathname.startsWith("/verification")) {
      const target = verifHash
        ? `/verification/${verifHash}`
        : "/auth?view=login";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logos|$).*)"],
};
