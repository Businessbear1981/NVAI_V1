import { NextResponse, type NextRequest } from 'next/server';

/**
 * Pass-through middleware. The DDNDA is NOT a gate to entry — it's an optional
 * document a visitor may sign once they're inside. No route is blocked.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
