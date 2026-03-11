import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];
const authRoutes = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  //extract the pathname that we are trying to navigate to
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => {
    return pathname.startsWith(route);
  });

  const isAuthRoutes = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const loginURL = new URL("/sign-in", request.url);
    loginURL.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginURL);
  }

  if (isAuthRoutes && token) {
    const homeURL = new URL("/", request.url);
    return NextResponse.redirect(homeURL);
  }

  return NextResponse.redirect(new URL("/home", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    /*s
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files
     */
    String.raw`/((?!_next/static|_next/image|favicon.ico|.*\..*).)`,
  ],
};
