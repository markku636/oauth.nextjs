import { ILayoutProps } from '@/typing/page-props';
import MultiLangClientProvider from '@providers/multi-language-provider';

export default function LocaleLayout({ params, children }: Readonly<ILayoutProps>) {
    const { locale } = params;

    return <MultiLangClientProvider locale={locale}>{children}</MultiLangClientProvider>;
}
