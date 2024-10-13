'use client';
import { useAppDispatch } from '@/redux/features/hooks';
import { closeSidebar } from '@/redux/features/ui/ui-slice';
import { IMenu } from '@/typing/layout';
import Link from 'next/link';

export default function SidebarMenu({ menu }: Readonly<{ menu: IMenu[] }>) {
    const dispatch = useAppDispatch();

    return (
        <ul className="mt-4 flex flex-col text-sm font-bold text-black-coolpc">
            {menu.map((item) => (
                <Link
                    key={item.id}
                    href={item.link}
                    className="cursor-pointer px-6 py-2"
                    onClick={() => {
                        dispatch(closeSidebar());
                    }}
                >
                    {item.titleLang}
                </Link>
            ))}
        </ul>
    );
}
