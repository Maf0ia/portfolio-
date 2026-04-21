import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 100;

    const limit = rateLimit.get(ip);
    if (!limit || now > limit.resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      if (limit.count >= maxRequests) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
      limit.count++;
    }
  }

  // Block suspicious user agents
  const userAgent = request.headers.get('user-agent') || '';
  const blockedAgents = ['sqlmap', 'nikto', 'nmap', 'masscan'];
  if (blockedAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
