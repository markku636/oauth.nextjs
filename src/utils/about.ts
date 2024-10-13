import { IAboutContent } from '@/typing/layout';
import { ReactNode } from 'react';

export function getLocaleFromPathname(pathname: string) {
    if (pathname === '/en') {
        return '/';
    }
    return pathname.startsWith('/en') ? pathname.substring(3) : pathname;
}

export function getAboutContent(content: IAboutContent[], pagePathname: string): ReactNode {
    const exactMatch = content.find(({ exactMatchPathnames }) =>
        exactMatchPathnames.some((pathItem) => pathItem.pathname === pagePathname)
    );

    if (exactMatch) {
        return exactMatch.markdown;
    }

    const partialMatch = content.find(({ partialMatchPathnames }) =>
        partialMatchPathnames.some((pathItem) => pagePathname.includes(pathItem.pathname))
    );

    if (partialMatch) {
        return partialMatch.markdown;
    }

    return null;
}

/**
 * * unused
 */
enum AboutType {
    GAMING_PC_HOME = 'GamingPCHome',
    GAMING_PCS = 'GamingPCs',
    GAMING_PC_BUILDER = 'GamingPCBuilder',
    PC_BUILDER = 'PCBuilder',
    PREBUILD_PC = 'PrebuiltPC',
    EAZY_PC_BUILDER = 'EasyPcBuilder',
    GEAR_STORE = 'GearStore',
    GAMING_LAP_TOP = 'GamingLaptop',
    REFURBISHED = 'Refurbished',
    NOT_MATCH = 'TypeNotMatch',
}

const aboutPreMatchConfig = {
    '/': AboutType.GAMING_PC_HOME, // contentLang: AboutIBP-GamingPCHome
    '/new-lobby': AboutType.GAMING_PC_BUILDER,
    '/gaming-pcs': AboutType.GAMING_PCS,
    '/gaming-pcs/pc-builder': AboutType.PC_BUILDER,
    '/gaming-pcs/prebuilt-gaming-pcs': AboutType.PREBUILD_PC,
    '/gear-store/refurbished': AboutType.REFURBISHED,
};

/**
 * Map1, Map2
 */

/**
 * 前端 Prerender Markdown
 * const node = {
 *
 * }
 */
function findAboutType(pageUrl: string) {
    if (pageUrl in aboutPreMatchConfig) {
        return aboutPreMatchConfig[pageUrl as keyof typeof aboutPreMatchConfig];
    }

    switch (true) {
        case pageUrl.includes('gaming-laptop') || pageUrl.includes('laptop'):
            return AboutType.GAMING_LAP_TOP;
        case pageUrl.includes('gear-store'):
            return AboutType.GEAR_STORE;
        case pageUrl.includes('easy-pc-builder'):
            return AboutType.EAZY_PC_BUILDER;
        default:
            return AboutType.NOT_MATCH;
    }
}

// export function findContent(content: IAboutContent[], pageUrl: string) {
//     return content.find((item) => item.type === findAboutType(pageUrl));
// }
