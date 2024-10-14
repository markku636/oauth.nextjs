'use client';
import { CookieKeys } from '@/const/keys';
import { useAppDispatch } from '@/redux/reducer/hooks';
import { closeCookieBar, setPopupModalData, updateCookieBarSettings } from '@/redux/reducer/ui/ui-slice';
import CustomButton from '@components/ui/button/custom-button';
import { TableProps } from '@components/ui/table';
import cn from '@utils/classname/cn';
import { Routes } from '@utils/routes';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

type CategoryField = 'essential' | 'marketing' | 'amazon' | 'trustshop';
type CategoryType = 'text' | 'toggle';

interface Category<T> {
    id: number;
    title: string;
    description: string;
    type: CategoryType;
    field: CategoryField;
    text?: string;
    checked?: boolean;
    table?: TableProps<T>;
}

export default function CookieSettingsPopup() {
    const t = useTranslations('common');
    const dispatch = useAppDispatch();

    const columns = [
        {
            name: t('popup-accept-cookies-table-column-field-name'),
            dataIndex: 'name',
        },
        {
            name: t('popup-accept-cookies-table-column-field-provider'),
            dataIndex: 'provider',
        },
        {
            name: t('popup-accept-cookies-table-column-field-purpose'),
            dataIndex: 'purpose',
        },
        {
            name: t('popup-accept-cookies-table-column-field-procedure'),
            dataIndex: 'procedure',
        },
    ];

    const initialCategories: Category<Record<string, string>>[] = [
        {
            id: 1,
            field: 'essential',
            type: 'text',
            text: t('text-always active'),
            title: t('popup-accept-cookies-category-essential-title'),
            description: t('popup-accept-cookies-category-essential-description'),
            table: {
                columns: columns,
                data: [
                    {
                        name: 'CartID',
                        provider: 'coolpc',
                        purpose: t('popup-accept-cookies-category-essential-purpose-shopping-cart'),
                        procedure: t('1-year'),
                    },
                    {
                        name: 'CustOrderID',
                        provider: 'coolpc',
                        purpose: t('popup-accept-cookies-category-essential-purpose-shopping-cart'),
                        procedure: t('1-year'),
                    },
                    {
                        name: 'Next_ LOCALE',
                        provider: 'coolpc',
                        purpose: t('popup-accept-cookies-category-essential-purpose-multilingual'),
                        procedure: t('1-year'),
                    },
                ],
            },
        },
        {
            id: 2,
            field: 'marketing',
            type: 'toggle',
            checked: true,
            title: t('popup-accept-cookies-category-marketing-title'),
            description: t('popup-accept-cookies-category-marketing-description'),
            table: {
                columns: columns,
                data: [
                    {
                        name: '_ga',
                        provider: 'Google Analytics',
                        purpose: t('popup-accept-cookies-category-marketing-ga-purpose-collect'),
                        procedure: t('1-year'),
                    },
                    {
                        name: '_ga_ VC36YLFPB2',
                        provider: 'Google Analytics',
                        purpose: t('popup-accept-cookies-category-marketing-ga-purpose-control'),
                        procedure: t('1-year'),
                    },
                ],
            },
        },
        {
            id: 3,
            field: 'amazon',
            type: 'toggle',
            checked: true,
            title: t('popup-accept-cookies-category-amazon-title'),
            description: t('popup-accept-cookies-category-amazon-description'),
        },
        {
            id: 4,
            field: 'trustshop',
            type: 'toggle',
            checked: true,
            title: t('popup-accept-cookies-category-trustshop-title'),
            description: t('popup-accept-cookies-category-trustshop-description'),
        },
    ];

    const [categories, setCategories] = useState(initialCategories);

    const handleOnChange = (id: number) => {
        const updateCategories = categories.map((data) =>
            data.id === id && data.type === 'toggle' ? { ...data, checked: !data.checked } : data
        );

        setCategories(updateCategories);
    };

    const handleClickDone = () => {
        handleUpdateCookieSettings();
        handleClosePopup();
    };

    const handleUpdateCookieSettings = () => {
        const settings = categories.reduce((acc, { type, field, checked }) => {
            if (type === 'toggle' && checked !== undefined) {
                acc[field] = checked;
            }

            return acc;
        }, {} as Record<CategoryField, boolean>);

        const updateSettings = {
            allowMarketing: settings.marketing,
            allowAmazon: settings.amazon,
            allowTrustShop: settings.trustshop,
        };

        Cookies.set(CookieKeys.AcceptCookies, JSON.stringify(updateSettings), { expires: 365 });
        dispatch(updateCookieBarSettings(updateSettings));
    };

    const handleClosePopup = () => {
        dispatch(closeCookieBar());
        dispatch(setPopupModalData({ modalView: '', modalData: null }));
    };

    return (
        <div className="overflow-y-scroll max-w-[640px] h-[80vh] flex flex-col items-center gap-4 md:px-6">
            <h4 className="font-bold text-lg xl:text-2xl">{t('popup-accept-cookies-title')}</h4>
            <p className="text-xs">
                {t.rich('popup-accept-cookies-description', {
                    a: (chunks) => (
                        <Link
                            className="text-blue-coolpcLink hover:underline hover:text-blue-coolpcLink"
                            href={Routes.Policy}
                        >
                            {chunks}
                        </Link>
                    ),
                })}
            </p>
            <div className="flex flex-col w-full gap-6 break-words">
                {categories.map(({ id, title, description, type, text, checked, table }) => (
                    <div
                        key={title}
                        className={cn(
                            'flex flex-col pb-4 gap-4 border-b-2 border-solid border-black last:border-b last:border-gray-light'
                        )}
                    >
                        <div className="flex gap-4 justify-between items-center">
                            <h5 className="font-bold text-base md:text-lg">{title}</h5>
                            {type === 'text' ? (
                                <div className="text-sm">{text}</div>
                            ) : (
                                <div className="flex flex-shrink-0 items-center">
                                    <label className="switch relative inline-block w-10 cursor-pointer">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="h-0 w-0 opacity-0"
                                            onChange={() => handleOnChange(id)}
                                            checked={checked}
                                        />
                                        <span className="slider round absolute inset-0 bg-gray-300 transition-all duration-300 ease-in"></span>
                                    </label>
                                </div>
                            )}
                        </div>
                        <p className="text-xs">{description}</p>
                        {table && (
                            <table className="text-xs">
                                <thead>
                                    <tr>
                                        {table.columns.map((column, index) => (
                                            <th
                                                key={column.name}
                                                className={cn('text-left py-2 pr-6 border-b border-gray-light', {
                                                    'w-2/5': index === 1 || index === 2,
                                                    'w-1/5': index !== 2,
                                                })}
                                            >
                                                {column.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.data.map((cell, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-gray-light last:border-none">
                                            {table.columns.map((col) => (
                                                <td key={col.dataIndex} className="py-2 pr-6">
                                                    {col.render
                                                        ? col.render(cell[col.dataIndex])
                                                        : String(cell[col.dataIndex])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))}
            </div>
            <div className="sticky w-full -bottom-[1px] bg-white pt-4 pb-1">
                <CustomButton className="mx-auto" variant="white" onClick={handleClickDone}>
                    {t('button-done')}
                </CustomButton>
            </div>
        </div>
    );
}
