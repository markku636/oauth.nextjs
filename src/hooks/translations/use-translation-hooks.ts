import { useTranslations } from 'next-intl';

export function useTranslationsCommon() {
    const t = useTranslations('common');

    return t;
}

export function useTranslationActivateAccount() {
    const t = useTranslations('activate-account-page');

    return t;
}
