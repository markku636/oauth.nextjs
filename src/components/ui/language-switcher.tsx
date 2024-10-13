'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { Listbox, Transition } from '@headlessui/react';
import { siteSettings } from '@settings/site-settings';
import { getRedirectedPathName } from '@utils/utl-helper';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';

export default function LanguageSwitcher() {
    const params = useParams();
    const pathName = usePathname();

    const { site_header } = siteSettings;
    const t = useTranslationsCommon();
    const options = site_header.languageMenu;
    const router = useRouter();

    const currentSelectedItem = params?.lang ? options.find((o) => o.value === params.lang)! : options[2];
    const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

    function handleItemClick(values: any) {
        setSelectedItem(values);

        const redirctUrl = getRedirectedPathName(pathName || '/', values.value);

        location.href = redirctUrl;
    }

    return (
        <Listbox value={selectedItem} onChange={handleItemClick}>
            {({ open }) => (
                <div className="relative z-10 w-[140px] ltr:ml-2 rtl:mr-2 sm:w-[150px] lg:w-[130px] ltr:lg:ml-0 rtl:lg:mr-0 xl:w-[150px]">
                    <Listbox.Button className="relative w-full  cursor-pointer rounded-lg border border-gray-300  bg-white py-2 text-[13px] font-semibold text-heading shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ltr:pl-3 ltr:pr-7 ltr:text-left rtl:pl-7 rtl:pr-3 rtl:text-right xl:text-sm">
                        <span className="flex items-center truncate">
                            <span className="ltr:mr-1.5 rtl:ml-1.5">{selectedItem.icon}</span> {t(selectedItem.name)}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-1.5 rtl:left-0 rtl:pl-1.5">
                            <HiOutlineSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            static
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            {options?.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        `${active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'}
												relative cursor-pointer select-none px-3 py-2`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <span className="flex items-center">
                                            {option.icon}
                                            <span
                                                className={`${
                                                    selected ? 'font-medium' : 'font-normal'
                                                } block truncate ltr:ml-1.5 rtl:mr-1.5`}
                                            >
                                                {t(option.name)}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                                                />
                                            ) : null}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    );
}
