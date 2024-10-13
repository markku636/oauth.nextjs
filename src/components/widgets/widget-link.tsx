import Logo from '@components/ui/logo';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { FC } from 'react';

interface Props {
    className?: string;
    data: {
        widgetTitle?: string;
        lists: {
            id: string;
            path?: string;
            title: string;
            icon?: any;
        }[];
        logo?: any;
        description?: string;
        isCompanyIntroduction?: boolean;
    };
    variant?: 'contemporary';
}

const WidgetLink: FC<Props> = ({ className, data }) => {
    const { widgetTitle, lists } = data;
    const { logo, description } = data;
    const t = useTranslations('footer');

    return (
        <div className={`${className} ${data?.isCompanyIntroduction && 'col-span-2'}`}>
            {!data?.isCompanyIntroduction ? (
                <>
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">
                        {t(`${widgetTitle}`)}
                    </h4>
                    <ul className="flex flex-col space-y-3 text-xs text-body lg:space-y-3.5 lg:text-sm">
                        {lists.map((list) => (
                            <li key={`widget-list--key${list.id}`} className="flex items-baseline">
                                {list.icon && (
                                    <span className="relative top-0.5 text-sm ltr:mr-3 rtl:ml-3 lg:top-1 lg:text-base">
                                        {list.icon}
                                    </span>
                                )}
                                <Link href={list.path ? list.path : '#!'}>
                                    <div className="transition-colors duration-200 hover:text-black">
                                        {t(`${list.title}`)}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="lg:space-y-7.5 flex flex-col space-y-7 ltr:mr-4 rtl:ml-4">
                    <Logo className="" />
                    <p className="max-w-[334px] text-sm font-normal leading-6 text-[#1D1E1F] ">{description}</p>
                    <ul className="flex items-center gap-x-3 text-xs text-body lg:gap-x-3.5 lg:text-sm">
                        {lists.map((list) => (
                            <li key={`widget-list--key${list.id}`} className="flex items-baseline">
                                {list.icon && (
                                    <span className="relative top-0.5 text-sm ltr:mr-3 rtl:ml-3 lg:top-1 lg:text-base">
                                        {list.icon}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WidgetLink;
