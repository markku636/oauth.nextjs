import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';

export enum MultiLangModules {
    Common = 'common',
    // pages
    CartsPage = 'carts-page',
    SupportPage = 'support-page',
    NextDayPCPage = 'next-day-pc-page',
    OrderConfirmPage = 'order-confirm-page',
    ContactUsPage = 'contact-us-page',
    // components
    Product = 'product',
    ConsorsFinanz = 'consors-finanz',
    Configurator = 'configurator',
}

interface MultiLanguageProviderProps {
    locale: string;
    modules?: MultiLangModules | MultiLangModules[];
    children: ReactNode;
}

export default function MultiLangClientProvider({ locale, modules, children }: Readonly<MultiLanguageProviderProps>) {
    const messages = useMessages(); // messages provided in `i18n.ts`

    const pickModules = modules ? [MultiLangModules.Common, ...modules] : MultiLangModules.Common;

    return (
        <NextIntlClientProvider locale={locale} messages={pick(messages, pickModules)}>
            {children}
        </NextIntlClientProvider>
    );
}
