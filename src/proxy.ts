import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

const SESSION_COOKIE_NAMES = [
  "access_token",
  "refresh_token",
  "accessToken",
  "refreshToken",
] as const;

export function proxy(request: NextRequest) {
  const hasSession = SESSION_COOKIE_NAMES.some((cookieName) =>
    Boolean(request.cookies.get(cookieName)?.value),
  );

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    const redirectPath = `${pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set("redirect", redirectPath);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    String.raw`/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\..*).*)`,
  ],
};
