import { Metadata } from 'next';

export const SITE_URL = 'https://www.coolpc.de/';
export const SITE_NAME = 'Cool3C';
export const SITE_LOGO = process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/logo.png';

export function generateDefaultMetadata(locale: string, pathname: string): Metadata {
    const metaContent = {
        de: {
            title: 'Kaufen Sie Gaming-PCs, Desktops und mehr günstig online bei Cool3C',
            description:
                'Cool3C ist Ihre Anlaufstelle für leistungsstarke Gaming-PCs, hochwertige Hardware und Gaming-Zubehör.',
            keywords:
                'high end pc, best pre built gaming pc, pre built desktop, pc zusammenstellen, gaming, pc, gaming pc, pc kaufen, konfigurieren',
        },
        en: {
            title: 'Buy Gaming PCs, Desktops, and More Affordable Online at Cool3C',
            description:
                'Cool3C is your go-to shop for powerful gaming PCs, high-quality hardware, and gaming accessories.',
            keywords:
                'high end pc, best pre built gaming pc, pre built desktop, pc builder, custom pc, gaming, pc, gaming pc, buy pc',
        },
    };

    const content = locale === 'de' ? metaContent.de : metaContent.en;
    const fullUrl = new URL(pathname, SITE_URL).href;
    const pathnameWithoutLang = pathname.replace('de/', '').replace('/en', '');

    return {
        title: {
            template: `%s | ${content.title}`, // "%s" can be used to add a prefix or a suffix to titles defined in child route segments.
            default: content.title, // provide a fallback title to child route segments that don't define a title
        },
        description: content.description,
        keywords: content.keywords,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: pathname,
            languages: {
                'de-DE': '/de' + pathnameWithoutLang,
                'en-US': '/en' + pathnameWithoutLang,
            },
        },
        referrer: 'origin-when-cross-origin',
        robots: {
            follow: true,
            index: true,
        },
        openGraph: {
            title: content.title,
            description: content.description,
            type: 'website',
            siteName: SITE_NAME,
            url: fullUrl,
            locale: locale === 'de' ? 'de_DE' : 'en_US',
            images: {
                url: SITE_LOGO,
                width: 199,
                height: 29,
                alt: SITE_NAME,
            },
        },
        twitter: {
            title: content.title,
            description: content.description,
            site: '@Cool3C',
            creator: '@Cool3C',
            card: 'summary_large_image',
        },
    };
}
