'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { HiCheck, HiOutlineSelector } from 'react-icons/hi';
type Option = {
    name: string;
    value: string;
};

export default function ListBox({ options }: { options: Option[] }) {
    const t = useTranslationsCommon();
    const router = useRouter();
    const { pathname, query } = router;
    const currentSelectedItem = query?.sort_by ? options.find((o) => o.value === query.sort_by)! : options[0];
    const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
    useEffect(() => {
        setSelectedItem(currentSelectedItem);
    }, [query?.sort_by]);
    function handleItemClick(values: Option) {
        setSelectedItem(values);
        const { sort_by, ...restQuery } = query;
        router.push(
            {
                pathname,
                query: {
                    ...restQuery,
                    ...(values.value !== options[0].value ? { sort_by: values.value } : {}),
                },
            },
            undefined,
            { scroll: false }
        );
    }

    return (
        <Listbox value={selectedItem} onChange={handleItemClick}>
            {({ open }) => (
                <div className="relative z-10 min-w-[180px] ltr:ml-2 rtl:mr-2 ltr:lg:ml-0 rtl:lg:mr-0">
                    <Listbox.Button className="relative w-full  cursor-pointer rounded-lg border border-gray-300  bg-white py-2 text-[13px] font-semibold text-heading shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ltr:pl-3 ltr:pr-10 ltr:text-left rtl:pl-10 rtl:pr-3 rtl:text-right sm:text-sm md:text-sm">
                        <span className="block truncate">{t(selectedItem.name)}</span>
                        <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2">
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
                            {options?.map((option, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `${active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'}
                          relative cursor-default select-none py-2 ltr:pl-10 ltr:pr-4 rtl:pl-4 rtl:pr-10`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                                            >
                                                {t(option.name)}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`${active ? 'text-amber-600' : ''}
                                check-icon absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                                                >
                                                    <HiCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
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
