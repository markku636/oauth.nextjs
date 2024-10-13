import { generateDefaultMetadata } from '@/metadata-config';
import { fetchLayout } from '@/services/mock-service';

import { ILayoutProps } from '@/typing/page-props';
import HeaderAuth from '@components/layout/header/header-auth';
import MultiLangClientProvider from '@providers/multi-language-provider';
import translateDeep from '@utils/muilti-language-translations/translate-deep';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { headers } from 'next/headers';
import { use } from 'react';

type Props = {
    params: { locale: string };
};

export function generateMetadata({ params }: Props, parent: ResolvingMetadata): Metadata {
    const locale = params.locale;

    const url = new URL(headers().get('x-url')!);

    return generateDefaultMetadata(locale, url.pathname);
}

export default function LocaleLayout({ params, children }: Readonly<ILayoutProps>) {
    const { locale } = params;

    const t = useTranslations('layout');
    const data = use(fetchLayout());
    const { header } = translateDeep(data, t);

    return (
        <MultiLangClientProvider locale={locale}>
            <HeaderAuth header={header} />
            {children}
        </MultiLangClientProvider>
    );
}
