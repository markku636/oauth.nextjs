import usePageLocale from '@/hooks/use-locale';

export default function useNoImageUrl() {
    const locale = usePageLocale();

    if (locale === 'de') {
        return process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/gamer-pc-page/no-image-sm_de.png';
    }
    return process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/gamer-pc-page/no-image-sm_en.png';
}
