import { ReactNode } from 'react';

import { ILanguageMenu } from '@/typing/layout';
import { useTranslations } from 'next-intl';
import TopHeader from './top-header';

interface IHeaderProps {
    languageMenu: ILanguageMenu[];
    children: ReactNode;
}

export default function HeaderWithSwither({ languageMenu, children }: Readonly<IHeaderProps>) {
    const t = useTranslations('layout');

    return (
        <header id="siteHeader" className="sticky top-0 z-20 w-full">
            <TopHeader languageMenu={languageMenu} chatText={t('chat')} />
            <div className="w-full bg-white shadow-bottom">{children}</div>
        </header>
    );
}
