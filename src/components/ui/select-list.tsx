'use cilent';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { Listbox, Transition } from '@headlessui/react';
import cn from '@utils/classname/cn';
import { Fragment } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';

interface ListItem {
    name: string;
}

interface ISelectList<T extends ListItem> {
    list: T[];
    selected: T;
    onChange: (value: T) => void;
    labelKey?: string;
    className?: string;
}

export default function SelectList<T extends ListItem>({
    list,
    selected,
    onChange,
    labelKey,
    className = '',
}: Readonly<ISelectList<T>>) {
    const t = useTranslationsCommon();

    return (
        <div className={cn('w-full relative', className)}>
            {labelKey && (
                <span className="absolute -top-0.5 z-10 left-4 px-3 text-gray-coolpcText bg-white text-xs">
                    {t(labelKey)}
                </span>
            )}
            <Listbox value={selected} onChange={onChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3.5 pl-5 pr-10 text-left sm:text-sm border border-gray-light">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiOutlineSelector className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {list.map((item, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-gray-coolpc' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {item.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
