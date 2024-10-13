'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Link from '@components/ui/link';
import Text from '@components/ui/text';
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { FaLink } from 'react-icons/fa';

interface Props {
    item: any;
    effectActive?: boolean;
    variant?: 'default' | 'modern' | 'circle' | 'list';
    href: LinkProps['href'];
}

const IconCard: React.FC<Props> = ({ item, effectActive = false, variant = 'default', href }) => {
    const { name, icon, tags, productCount } = item ?? {};
    const t = useTranslationsCommon();

    return (
        <Link
            href={href}
            className={cn('group flex justify-center  rounded-lg', {
                'h-28 flex-col bg-gray-200 sm:h-[8.5rem] md:h-40 xl:h-[11.5rem] 2xl:h-44 3xl:h-60':
                    variant === 'default',
                'flex-col bg-gray-200 px-6 pb-5 pt-7 lg:px-8 lg:pb-8 lg:pt-10': variant === 'modern',
                'flex-col items-center': variant === 'circle',
                'gap-[25px] bg-gray-200 px-3 py-5 lg:px-4 lg:py-8 xl:gap-[30px] 2xl:gap-[40px] 3xl:gap-[50px]':
                    variant === 'list',
            })}
        >
            <div
                className={cn('relative flex items-center', {
                    'mx-auto mb-3.5 md:mb-4 lg:mb-5 lg:h-24 xl:mb-2 2xl:mb-6 3xl:mb-8': variant === 'default',
                    'h-16 ltr:mr-auto rtl:ml-auto': variant === 'modern',
                    'mb-3.5 h-[105px] w-[105px] max-w-full justify-center rounded-full bg-gray-200 md:mb-4 md:h-32 md:w-32 lg:mb-5 lg:h-[140px] lg:w-[140px] xl:h-44 xl:w-44':
                        variant === 'circle',
                    'flex-shrink-0': variant === 'list',
                })}
            >
                <img
                    src={icon}
                    alt={name || t('text-card-thumbnail')}
                    className={cn('mb-0', {
                        'mx-auto mb-4 w-2/4 sm:mb-6 sm:w-2/3 md:w-8/12 3xl:w-full': variant === 'default',
                        'mb-4 w-2/4 sm:mb-6': variant === 'modern',
                        'scale-[0.6] transform lg:scale-75 2xl:scale-85 3xl:scale-90': variant === 'circle',
                        'mx-auto w-[40%] lg:w-2/4': variant === 'list',
                    })}
                />
                {effectActive === true && variant === 'circle' && (
                    <>
                        <div className="absolute left-0 top-0 h-full w-full rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full">
                            <FaLink className="scale-0 transform text-base text-white opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:text-xl lg:text-2xl xl:text-3xl" />
                        </div>
                    </>
                )}
            </div>

            <div
                className={cn('flex flex-col', {
                    'mx-auto gap-y-2 overflow-hidden': variant === 'list',
                })}
            >
                <Text
                    variant="heading"
                    className={cn('capitalize', {
                        'absolute inset-x-0 bottom-4 text-center sm:bottom-5 md:bottom-6 xl:bottom-8':
                            variant === 'default',
                        'mb-1': variant === 'modern',
                    })}
                >
                    {name}
                </Text>

                {(variant === 'modern' || variant === 'list') && (
                    <Text
                        className={cn('truncate pb-0.5', {
                            '': variant === 'list',
                        })}
                    >
                        {`${tags?.length} ${t('text-brands')}, ${productCount}+ ${t('text-products')}`}
                    </Text>
                )}
            </div>

            {effectActive === true && variant !== 'circle' && (
                <>
                    <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center  rounded-lg">
                        <FaLink className="scale-0 transform text-base text-white opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:text-xl lg:text-2xl xl:text-3xl" />
                    </div>
                </>
            )}
        </Link>
    );
};

export default IconCard;
