import { serverSideLog } from '@utils/log/server-side-log';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

// Ref: https://nextjs.org/docs/app/api-reference/functions/revalidatePath#examples

// if need to revalidate by folder strcture like gear product detail pages
// revalidatePath('/[locale]/(layout-share)/gear-store/[slug]', 'page');

export function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('revalidatePath');

    if (path) {
        const locales = ['en', 'de'];

        for (const locale of locales) {
            const localePath = `/${locale}${path}`;

            console.log('[Revalidate path]', localePath);
            revalidatePath(localePath);
        }

        serverSideLog(`[Revalidate path] ${path}`);

        return Response.json({ path, revalidated: true, now: Date.now() });
    }

    return Response.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
    });
}
