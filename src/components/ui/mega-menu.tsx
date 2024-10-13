'use client';
import Link from '@components/ui/link';
import { useTranslations } from 'next-intl';
import React from 'react';

interface MenuItem {
    id: number | string;
    path: string;
    label: string;
    columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
    columns: {
        id: number | string;
        columnItems: MenuItem[];
    }[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
    const t = useTranslations('menu');

    return (
        <div className="megaMenu absolute bg-gray-200 py-7 shadow-header ltr:-left-28 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0 ">
            <div className="grid grid-cols-5">
                {columns?.map((column) => (
                    <ul className="pb-7 pt-6 even:bg-gray-150 2xl:pb-8 2xl:pt-7" key={column.id}>
                        {column?.columnItems?.map((columnItem) => (
                            <React.Fragment key={columnItem.id}>
                                <li className="mb-1.5">
                                    <Link
                                        href={columnItem.path}
                                        className="block px-5 py-1.5 text-sm font-semibold text-heading hover:bg-gray-300 hover:text-heading xl:px-8 2xl:px-10"
                                    >
                                        {t(columnItem.label)}
                                    </Link>
                                </li>
                                {columnItem?.columnItemItems?.map((item: any) => (
                                    <li
                                        key={item.id}
                                        className={
                                            columnItem?.columnItemItems?.length === item.id
                                                ? 'mb-3 border-b border-gray-300 pb-3.5'
                                                : ''
                                        }
                                    >
                                        <Link
                                            href={item.path}
                                            className="block px-5 py-1.5 text-sm text-body hover:bg-gray-300 hover:text-heading xl:px-8 2xl:px-10"
                                        >
                                            {t(item.label)}
                                        </Link>
                                    </li>
                                ))}
                            </React.Fragment>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default MegaMenu;
