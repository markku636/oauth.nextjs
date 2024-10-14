'use client';
import { IMenu } from '@/typing/layout';
import Link from 'next/link';

interface MenuProps {
    menu: IMenu[];
    className?: string;
}

export default function Menu({ menu }: Readonly<MenuProps>) {
    return (
        <nav className="hidden headerMenu md:ml-6 lg:flex">
            {menu.map((item) => (
                <Link
                    key={item.id}
                    href={item.link}
                    className="flex items-center px-3 py-2 text-sm cursor-pointer text-heading group-hover:text-black xl:px-4 xl:text-base"
                >
                    {item.titleLang}
                </Link>
            ))}
        </nav>
    );
}
