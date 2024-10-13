'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { useAcceptCookies } from '@/hooks/use-accept-cookies';
import Search from '@components/common/search';
import Footer from '@components/layout/footer/footer-template';
import Header from '@components/layout/header/header-template';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation-template';
import { NextSeo } from 'next-seo';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
    const t = useTranslationsCommon();

    return (
        <div className="flex flex-col min-h-screen">
            <NextSeo
                additionalMetaTags={[
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1.0',
                    },
                ]}
                title="CoolPC React - React Next E-commerce Template"
                description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
                canonical="https://CoolPC.vercel.app/"
                openGraph={{
                    url: 'https://CoolPC.vercel.app',
                    title: 'CoolPC React - React Next E-commerce Template',
                    description:
                        'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
                    images: [
                        {
                            url: '/assets/images/og-image-01.png',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: '/assets/images/og-image-02.png',
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                    ],
                }}
            />
            <Header />
            <main
                className="relative flex-grow overflow-hidden"
                style={{
                    minHeight: '-webkit-fill-available',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {children}
            </main>
            <Footer />
            <MobileNavigation />
            <Search />
        </div>
    );
}
