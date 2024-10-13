'use client';
import useHideHeaderContent from '@/hooks/use-hide-header-content';
import { IMenu } from '@/typing/layout';
import Link from 'next/link';

interface MenuProps {
    menu: IMenu[];
    className?: string;
}

export default function Menu({ menu }: Readonly<MenuProps>) {
    const shouldHideMenu = useHideHeaderContent();

    return (
        <nav className="headerMenu hidden md:ml-6 lg:flex">
            {!shouldHideMenu &&
                menu.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        className="flex cursor-pointer items-center px-3 py-2 text-sm text-heading group-hover:text-black xl:px-4 xl:text-base"
                    >
                        {item.titleLang}
                    </Link>
                ))}
        </nav>
    );
}
