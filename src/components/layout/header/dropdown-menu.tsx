import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { IMenu } from '@/typing/layout';
import { FaChevronDown } from 'react-icons/fa';

interface IDropdownMenu {
    data: IMenu;
    activeSubmenus: string[];
    handleClick: (name: string) => void;
}

export default function DropdownMenu({ data, activeSubmenus, handleClick }: IDropdownMenu) {
    const t = useTranslationsCommon();

    return (
        <li
            className="relative flex cursor-pointer flex-col items-start px-3 py-2 text-sm text-heading group-hover:text-black xl:px-4 xl:text-base"
            onClick={() => handleClick(data.titleLang)}
        >
            {t(data.titleLang)}
            <span className="absolute right-4">
                <FaChevronDown className="transform transition duration-300 ease-in-out group-hover:-rotate-180" />
            </span>
            {activeSubmenus.includes(data.titleLang) && (
                <ul className="mt-2 flex flex-col gap-2">
                    {data.subMenu.map((sub) => (
                        <li key={sub.id}>{t(sub.titleLang)}</li>
                    ))}
                </ul>
            )}
        </li>
    );
}
