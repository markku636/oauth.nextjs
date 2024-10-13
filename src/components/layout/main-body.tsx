import { ReactNode } from 'react';

export default function Mainbody({ locale, children }: Readonly<{ locale: string; children: ReactNode }>) {
    return (
        <main
            lang={locale}
            className="relative flex-grow overflow-clip"
            style={{
                minHeight: '-webkit-fill-available',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            {children}
        </main>
    );
}
