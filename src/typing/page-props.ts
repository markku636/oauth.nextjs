import { ReactNode } from 'react';

export interface IPageProps {
    params: { slug: string; locale: string };
    searchParams: Record<string, string | string[] | undefined>;
}

export interface ILayoutProps {
    params: { locale: string };
    children: ReactNode;
}
