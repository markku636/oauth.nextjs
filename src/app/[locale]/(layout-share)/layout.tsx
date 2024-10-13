import { SiteSchema } from '@/const/seo-schema';
import { generateDefaultMetadata } from '@/metadata-config';
import { fetchLayout } from '@/services/mock-service';

import { ILayoutProps } from '@/typing/page-props';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import ManagedModal from '@components/common/modal/managed-modal';
import NewManageModal from '@components/common/modal/new-managed-modal';
import Footer from '@components/layout/footer/footer';
import Header from '@components/layout/header/header';
import Mainbody from '@components/layout/main-body';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import MultiLangClientProvider from '@providers/multi-language-provider';
import translateDeep from '@utils/muilti-language-translations/translate-deep';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { headers } from 'next/headers';
import { use } from 'react';

type Props = {
    params: { locale: string };
};

// see /ancient, /checkout page
export function generateMetadata({ params }: Props, parent: ResolvingMetadata): Metadata {
    const locale = params.locale;

    const url = new URL(headers().get('x-url')!);

    return generateDefaultMetadata(locale, url.pathname);
}

export default function Layout({ params: { locale }, children }: Readonly<ILayoutProps>) {
    const t = useTranslations('layout');

    const data = use(fetchLayout());
    const { header, footer } = translateDeep(data, t);

    return (
        <>
            <SiteSchema locale={locale} />

            <MultiLangClientProvider locale={locale}>
                <Header header={header} />
                <Mainbody locale={locale}>{children}</Mainbody>
                <Footer footer={footer} />
                <MobileNavigation header={header} />
                <NewManageModal />
                <ManagedModal />
                <ManagedDrawer />
            </MultiLangClientProvider>
        </>
    );
}
