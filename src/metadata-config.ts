import { Metadata } from 'next';

export const SITE_URL = 'https://www.coolpc.de/';
export const SITE_NAME = 'Cool3C';
export const SITE_LOGO = process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/logo.png';

export function generateDefaultMetadata(locale: string, pathname: string): Metadata {
    const metaContent = {
        de: {
            title: '在 Cool3C 便宜購買遊戲電腦、桌上型電腦及更多',
            description: 'Cool3C 是您購買強大遊戲電腦、高品質硬體及遊戲配件的首選商店。',
            keywords: '高端電腦, 最佳預組遊戲電腦, 預組桌上型電腦, 組裝電腦, 遊戲, 電腦, 遊戲電腦, 購買電腦, 配置電腦',
        },
        en: {
            title: '在 Cool3C 在線便宜購買3C',
            description: 'Cool3C 是您購買強大3C、高品質硬體及遊戲配件的首選商店。',
            keywords: '高端電腦, 最佳3C, 組裝電腦, 客製電腦, 遊戲, 電腦, 遊戲電腦, 購買電腦',
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
