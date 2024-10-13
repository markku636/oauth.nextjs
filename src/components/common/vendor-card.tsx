'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Link from '@components/ui/link';
import { TEMPLATE_ROUTES } from '@utils/routes';
import cn from 'classnames';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';

type VendorCardProps = {
    shop?: any;
    variant?: 'list' | 'grid';
};

const VendorCard: React.FC<VendorCardProps> = ({ shop, variant = 'list' }) => {
    const t = useTranslationsCommon();
    const placeholderImage = '/assets/placeholder/products/product-grid.svg';
    const { name, slug, address, logo, is_active } = shop;

    return (
        <Link
            href={`${TEMPLATE_ROUTES.SHOPS}/${slug}`}
            className={cn(
                'relative flex cursor-pointer items-center rounded-md bg-white px-5 shadow-vendorCard transition-all hover:shadow-vendorCardHover lg:px-6',
                {
                    'flex-col pb-9 pt-10 text-center lg:pb-11 lg:pt-12': variant === 'grid',
                    'py-5 lg:py-6': variant === 'list',
                }
            )}
        >
            {is_active && (
                <span className="absolute top-2 rounded bg-[#2B78C6] px-2 py-1 text-[10px] font-semibold uppercase text-white ltr:right-2 rtl:left-2 xl:py-[5px] xl:text-xs">
                    {t('text-new')}
                </span>
            )}

            <div
                className={cn(
                    'relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-300',
                    {
                        'h-24 w-24 lg:h-28 lg:w-28': variant === 'grid',
                        'h-16 w-16': variant === 'list',
                    }
                )}
            >
                <Image
                    alt={t('common:text-logo')}
                    src={logo?.thumbnail ?? placeholderImage}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div
                className={cn('flex flex-col', {
                    'mb-1 pt-4 md:pt-5 lg:pt-6': variant === 'grid',
                    'ms-4': variant === 'list',
                })}
            >
                <h4
                    className={cn('text-sm font-semibold leading-7 text-heading sm:leading-6 md:text-base xl:text-lg', {
                        'mb-1.5 2xl:text-xl': variant === 'grid',
                        'mb-0.5': variant === 'list',
                    })}
                >
                    {name}
                </h4>
                <p
                    className={cn('flex items-start text-[13px] leading-5', {
                        'text-sm': variant === 'grid',
                    })}
                >
                    <span className="relative top-1 inline-block text-[#6B7280] ltr:mr-1 rtl:ml-1">
                        <FaMapMarkerAlt />
                    </span>
                    {address}
                </p>
            </div>
        </Link>
    );
};

export default VendorCard;
