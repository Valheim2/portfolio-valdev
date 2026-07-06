import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Doit correspondre à ADMIN_COOKIE dans src/lib/auth.ts.
// On évite d'importer auth.ts ici (node:crypto incompatible avec l'edge runtime).
const ADMIN_COOKIE = "portfolio_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protège /admin/* sauf la page de connexion. Vérification de présence
  // du cookie ici ; la validation complète se fait côté serveur (page /admin).
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const hasSession = req.cookies.get(ADMIN_COOKIE);
    if (!hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
