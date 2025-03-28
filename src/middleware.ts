import { NextRequest, NextResponse } from "next/server";


const publicRoutes = ["/auth/login", "/auth/register"];
const protectedRoutes = [
  { path: "/" },
  { path: "/agency" },
  { path: "/customers" },
  { path: "/profile" },
  { path: "/tours" },
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname);
}

function getProtectedRoute(pathname: string) {
  return protectedRoutes.find((route) => pathname.startsWith(route.path));
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("dukanda-token")?.value;
  const user = request.cookies.get("dukanda-user")?.value;
  const url = request.nextUrl.clone();

  const isPrivateRoute = getProtectedRoute(url.pathname);
  const isPublic = isPublicRoute(url.pathname);

  console.log(`[Middleware] Iniciando verificação para a rota: ${url.pathname}`);
  console.log(`[Middleware] Token: ${token}`);
  console.log(`[Middleware] User: ${user}`);

  if (isPublic && (token || user)) {
    if (url.pathname !== "/") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Evita redirecionamento repetido para login
  if (isPrivateRoute && (!token || !user)) {
    if (url.pathname !== "/auth/login" && url.pathname !== "/auth/register") {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
  export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
  }
