'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import classNames from 'classnames';
import Image from 'next/image';

interface ItemProps {
    icon: string;
    title: string;
    description: string;
}

interface Props {
    className?: string;
    item: ItemProps;
}

const TextInformation: React.FC<Props> = ({ item, className }) => {
    const t = useTranslationsCommon();
    return (
        <div
            className={classNames(
                `border-gray-300 px-4 text-center sm:px-2.5 xl:border-l xl:py-12 xl:first:border-s-0 2xl:px-8 3xl:px-12`,
                className
            )}
        >
            <div className="mx-auto mb-3.5 w-14 md:mb-5 md:w-auto xl:mb-3.5 2xl:mb-5">
                <Image src={item.icon} alt={t(`${item.title}`)} width="78" height="78" />
            </div>
            <div className="-mb-1">
                <h3 className="mb-1.5 text-base font-semibold text-heading md:mb-2 md:text-lg">{t(`${item.title}`)}</h3>
                <p className="text-xs leading-6 text-body md:text-sm md:leading-7">{t(`${item.description}`)}</p>
            </div>
        </div>
    );
};

export default TextInformation;
