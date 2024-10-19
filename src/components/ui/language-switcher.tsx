'use client';
import { ILanguageMenu } from '@/typing/layout';
import { Listbox, Transition } from '@headlessui/react';
import { addActiveScroll } from '@utils/add-active-scroll';
import { Routes } from '@utils/routes';
import { getRedirectedPathName } from '@utils/utl-helper';
import { useParams, usePathname } from 'next/navigation';
import { Fragment, useRef, useState } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';
import LanguageIcon from './language-icon';

interface ILanguageProps {
    languageMenu: ILanguageMenu[];
}

const DE_LANGUAGE_MENU = {
    id: 'de',
    nameLang: 'DE',
    value: 'de',
};

export default function LanguageSwitcher({ languageMenu }: Readonly<ILanguageProps>) {
    const params = useParams();
    const pathname = usePathname();
    const DEFAULT_LANGUAGE = languageMenu.find((item) => item.value === params?.locale) || DE_LANGUAGE_MENU;
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const siteHeaderRef = useRef(null);

    addActiveScroll(siteHeaderRef);

    function changeMenuLanguage(values: any) {
        setLanguage(values);

        const redirctUrl = getRedirectedPathName(pathname || '/', values.value);

        location.href = redirctUrl;
    }

    if (pathname?.endsWith(Routes.Carts)) {
        return null;
    }

    return (
        <Listbox value={language} onChange={changeMenuLanguage}>
            {({ open }) => (
                <div className="relative z-10 ltr:ml-2 rtl:mr-2 ltr:lg:ml-0 rtl:lg:mr-0" ref={siteHeaderRef}>
                    <Listbox.Button className="relative w-full cursor-pointer border border-gray-300  bg-white py-1.5 text-[10px] text-heading shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ltr:pl-3 ltr:pr-7 ltr:text-left rtl:pl-7 rtl:pr-3 rtl:text-right sm:text-xs">
                        <span className="flex items-center truncate text-[10px] sm:text-xs">
                            <span className="ltr:mr-1.5 rtl:ml-1.5">
                                <LanguageIcon language={language.value} />
                            </span>
                            {language.nameLang}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-1.5 rtl:left-0 rtl:pl-1.5">
                            <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
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
                            className="absolute w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            {languageMenu
                                .filter((option) => option.nameLang !== language.nameLang)
                                .map((option) => (
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
                                                <LanguageIcon language={option.value} />
                                                <span
                                                    className={`${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    } block truncate ltr:ml-1.5 rtl:mr-1.5`}
                                                >
                                                    {option.nameLang}
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
