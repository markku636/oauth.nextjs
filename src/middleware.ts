import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const nextIntlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'de'],

    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'en',
});

const REDIRECT_MAP: Record<string, { url: string; status: number }> = {
    // 308 permanent redirect
    // '/Config/Search': { url: '/', status: 307 }, // TODO: change url after implement the page '/search',
};

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    request.headers.set('x-url', request.nextUrl.href);

    if (request.method === 'GET') {
        const redirectData = getRedirectData(pathname, REDIRECT_MAP);

        if (redirectData) {
            return NextResponse.redirect(new URL(redirectData.url, request.url), redirectData.status);
        }

        if (request.nextUrl.pathname !== request.nextUrl.pathname.toLowerCase()) {
            return NextResponse.redirect(new URL(request.nextUrl.origin + request.nextUrl.pathname.toLowerCase()));
        }
    }

    return nextIntlMiddleware(request);
}

function getRedirectData(
    pathname: string,
    rule: Record<string, { url: string; status: number }>
): { url: string; status: number } | null {
    for (const key in rule) {
        if (pathname.endsWith(key)) {
            return REDIRECT_MAP[key];
        }
    }

    return null;
}
