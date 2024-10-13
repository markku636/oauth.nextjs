import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const nextIntlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'de'],

    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'de',
});

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};

const REDIRECT_MAP: Record<string, { url: string; status: number }> = {
    // 308 permanent redirect
    '/Login/Register': { url: '/register', status: 308 },
    '/Login/Account': { url: '/account', status: 308 },
    '/Login/Account/OrderHistory': { url: '/account/order-history', status: 308 },
    '/Sale/PC-Konfigurator': { url: '/gaming-pcs', status: 308 },
    '/support/wiederrufsbelehrung': { url: '/support/return-policy', status: 308 },
    '/support/versandundzahlung': { url: '/support/payment-and-shipping', status: 308 },
    '/support/reklamation': { url: '/support/warranty-policy', status: 308 },
    '/Config/Ratenzahlung': { url: '/support/financing', status: 308 },
    '/company': { url: '/about-us', status: 308 },
    '/Company/Terms': { url: '/legal/terms', status: 308 },
    '/Company/Privacy': { url: '/legal/privacy', status: 308 },
    '/Company/Disclaimer': { url: '/legal/disclaimer', status: 308 },
    '/Support/Sitemap': { url: '/sitemap', status: 308 },
    '/support/widerrufsformular': { url: '/support/return-form', status: 308 },
    '/carts/OrderSurvey': { url: '/carts/order-confirm', status: 308 },
    '/gaming-pcs/ryzen-5000-series': { url: '/', status: 308 },
    '/gaming-pcs/western-digital': { url: '/', status: 308 },
    // 307 temporary redirect
    '/gaming-pcs/13th-gen-core': { url: '/', status: 307 }, // TODO: change url after implement the page '/gaming-pcs/14th-gen-core'
    '/Config/Search': { url: '/', status: 307 }, // TODO: change url after implement the page '/search',
};

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    request.headers.set('x-url', request.nextUrl.href);

    // request.headers.set('x-lang', request.url.includes('/en') ? 'en' : 'de');

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
