import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/satisfy';
import ReactQueryProviders from '@providers/react-query/react-query-provider';
// external
import 'react-toastify/dist/ReactToastify.css';
// base css file
import { Providers } from '@/redux/reducer/providers';
import Presence from '@components/layout/header/animate-presence';
import RevalidatePath from '@components/revalidate';
import getQueryClient from '@providers/react-query/get-query-client';
import Hydrate from '@providers/react-query/hydrate.client';
import '@styles/custom-plugins.css';
import '@styles/rc-drawer.css';
import '@styles/scrollbar.css';
import '@styles/swiper-carousel.css';
import '@styles/tailwind.css';
import { dehydrate } from '@tanstack/query-core';
import localFont from 'next/font/local';
import { ReactNode, Suspense } from 'react';
import { CartProvider } from './context/cart/cart.context';

// Font files can be colocated inside of `app`
export const GothamSSm = localFont({
    src: [
        {
            path: './fonts/woff2/GothamSSm-XLight_Web.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: './fonts/woff2/GothamSSm-XLightItalic_Web.woff2',
            weight: '200',
            style: 'italic',
        },
        {
            path: './fonts/woff2/GothamSSm-Light_Web.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/woff2/GothamSSm-LightItalic_Web.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: './fonts/woff2/GothamSSm-Book_Web.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/woff2/GothamSSm-BookItalic_Web.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/woff2/GothamSSm-Medium_Web.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/woff2/GothamSSm-MediumItalic_Web.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: './fonts/woff2/GothamSSm-Bold_Web.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/woff2/GothamSSm-BoldItalic_Web.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: './fonts/woff2/GothamSSm-Black_Web.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: './fonts/woff2/GothamSSm-BlackItalic_Web.woff2',
            weight: '800',
            style: 'italic',
        },
    ],
    display: 'swap',
});

// TODO: replace cart provider
// Layouts must accept a children prop.
// This will be populated with nested layouts or pages

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const queryClient = getQueryClient();
    const dehydratedState = dehydrate(queryClient);

    return (
        <html lang="de" className={GothamSSm.className}>
            <body dir="ltr" className="flex flex-col min-h-screen">
                <Providers>
                    <Presence>
                        <ReactQueryProviders>
                            <Hydrate state={dehydratedState}>
                                <CartProvider>{children}</CartProvider>
                                <Suspense>
                                    <RevalidatePath />
                                </Suspense>
                            </Hydrate>
                        </ReactQueryProviders>
                    </Presence>
                </Providers>
            </body>
        </html>
    );
}
