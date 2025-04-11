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
  const userCookie = request.cookies.get("dukanda-user")?.value;
  const url = request.nextUrl.clone();

  const isPrivateRoute = getProtectedRoute(url.pathname);
  const isPublic = isPublicRoute(url.pathname);

  console.log(`[Middleware] Iniciando verificação para a rota: ${url.pathname}`);
  console.log(`[Middleware] Token: ${token}`);
  console.log(`[Middleware] User: ${userCookie}`);

  // Se for rota pública e existir token/usuário, redirecione para "/" (ou dashboard)
  if (isPublic && (token || userCookie)) {
    if (url.pathname !== "/") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Se for rota privada e não houver token ou usuário, redirecione para a página de login
  if (isPrivateRoute && (!token || !userCookie)) {
    if (
      url.pathname !== "/auth/login" &&
      url.pathname !== "/auth/register"
    ) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Se o usuário está autenticado e está acessando uma rota protegida,
  // verifique se possui uma agência cadastrada.
  if (token && userCookie && isPrivateRoute) {
    // Tente extrair o id do usuário do cookie.
    let userId: string;
    try {
      const userObj = JSON.parse(userCookie);
      userId = userObj.id || userObj.userId;
    } catch (error) {
      console.error(`[Middleware] Erro ao analisar o cookie do usuário: ${error}`);
      // Se o cookie não for JSON, considere que o próprio cookie é o id.
      userId = userCookie;
    }

    // É importante evitar redirecionar caso o usuário já esteja na rota de criação de agência.
    if (!url.pathname.startsWith("/agency")) {
      try {
        // Realiza a chamada à sua API para buscar a agência.
        // Certifique-se de que a URL base esteja configurada via variável de ambiente.
        const res = await fetch(`https://dukanda-core-dev-0-0-1.onrender.com/api/TourAgencies/${userId}`, {
          headers: {
            // Caso necessário, inclua o token ou outras headers de autenticação
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        // Se a resposta for 404 ou não houver dados, redirecione para /crie-agencia.
        if (!res.ok) {
          console.error(`[Middleware] Agência não encontrada para o usuário ${userId}. Redirecionando...`);
          url.pathname = "/agency";
          return NextResponse.redirect(url);
        }

        const agencyData = await res.json();
        // Se a agência não existir ou estiver vazia, redirecione.
        if (!agencyData) {
          console.error(`[Middleware] Dados de agência vazios para o usuário ${userId}. Redirecionando...`);
          url.pathname = "/agency";
          return NextResponse.redirect(url);
        }
      } catch (error) {
        // Em caso de erro na chamada à API, redirecione (ou trate de outra forma, conforme sua necessidade).
        console.error(`[Middleware] Erro ao buscar agência: ${error}`);
        url.pathname = "/agency";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
