import { NextResponse, type NextRequest } from 'next/server';

/**
 * DDNDA enforcement: every non-public route requires a signed front-door agreement.
 *
 * Public (no DDNDA required): /, /ddnda, /kiki, /kiki/*, /api/*, static assets,
 *   and the Kiki sub-routes (those are the marketing funnel).
 *
 * Everything else (the chateau, gallery, piece pages, grand hall, grounds, parlor,
 * upstairs, admin, auction floor) requires the `nvai_ddnda_signed` cookie OR sessionStorage flag.
 *
 * The DDNDA page itself sets the cookie on successful signature.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass-through: static assets, api proxy, public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/paintings') ||
    pathname.startsWith('/provenance') ||
    pathname.startsWith('/kiki/photos') ||
    pathname.startsWith('/kiki/audio') ||
    pathname.startsWith('/kiki/audiobook') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Public NVAI routes that do not require DDNDA
  const PUBLIC_ROUTES = new Set([
    '/',
    '/ddnda',
    '/kiki',
    '/kiki/kickstarter',
    '/kiki/guestbook',
    '/inquire',
    '/about',
  ]);
  if (PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }
  // The kiki wing is public — sub-pages too
  if (pathname.startsWith('/kiki/')) return NextResponse.next();

  // Everything else gated behind DDNDA
  const signed = req.cookies.get('nvai_ddnda_signed')?.value;
  if (signed === '1') {
    return NextResponse.next();
  }

  // Redirect to /ddnda with a return path
  const url = req.nextUrl.clone();
  url.pathname = '/ddnda';
  url.searchParams.set('return', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
