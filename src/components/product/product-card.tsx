'use client';
import cn from 'classnames';
import Image from 'next/image';
import type { FC } from 'react';

import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
// import ProductIcon1 from '../../../public/assets/images/products/icons/product-icon1.svg'
// import ProductIcon2 from '../../../public/assets/images/products/icons/product-icon2.svg'
// import ProductIcon3 from '../../../public/assets/images/products/icons/product-icon3.svg'
import { useAppDispatch } from '@/redux/reducer/hooks';
import { openModal, setModalData, setModalView } from '@/redux/reducer/ui/ui-slice';

import ProductCompareIcon from '@components/icons/product-compare-icon';
import ProductViewIcon from '@components/icons/product-view-icon';
import ProductWishIcon from '@components/icons/product-wish-icon';

interface ProductProps {
    product: Product;
    className?: string;
    contactClassName?: string;
    imageContentClassName?: string;
    variant?:
        | 'grid'
        | 'gridSlim'
        | 'list'
        | 'listSmall'
        | 'gridModern'
        | 'gridModernWide'
        | 'gridTrendy'
        | 'rounded'
        | 'circle';
    imgWidth?: number | string;
    imgHeight?: number | string;
    imgLoading?: 'eager' | 'lazy';
    hideProductDescription?: boolean;
    showCategory?: boolean;
    showRating?: boolean;
    bgTransparent?: boolean;
    bgGray?: boolean;
    demoVariant?: 'ancient';
    disableBorderRadius?: boolean;
}

const ProductCard: FC<ProductProps> = ({
    product,
    className = '',
    contactClassName = '',
    imageContentClassName = '',
    variant = 'list',
    imgWidth = 340,
    imgHeight = 440,
    imgLoading,
    hideProductDescription = false,
    showCategory = false,
    showRating = false,
    bgTransparent = false,
    bgGray = false,
    demoVariant,
    disableBorderRadius = false,
}) => {
    const dispatch = useAppDispatch();
    const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
    const { price, basePrice, discount } = usePrice({
        amount: product.sale_price ? product.sale_price : product.price,
        baseAmount: product.price,
        currencyCode: 'USD',
    });

    function handlePopupView() {
        dispatch(setModalData({ data: product }));
        dispatch(setModalView('PRODUCT_VIEW'));
        dispatch(openModal());
    }

    return (
        <div
            className={cn(
                `group box-border flex overflow-hidden ${!disableBorderRadius && 'rounded-md'} cursor-pointer`,
                {
                    'transform flex-col items-start pb-2 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-product ltr:pr-0 rtl:pl-0 md:hover:-translate-y-1.5 lg:pb-3':
                        variant === 'grid' ||
                        variant === 'gridModern' ||
                        variant === 'gridModernWide' ||
                        variant === 'gridTrendy',
                    ' bg-white':
                        (variant === 'grid' && !bgGray) ||
                        (variant === 'gridModern' && !bgGray) ||
                        (variant === 'gridModernWide' && !bgGray) ||
                        (variant === 'gridTrendy' && !bgGray) ||
                        (variant === 'gridSlim' && !bgGray),
                    'bg-gray-200': variant === 'list' || bgGray,
                    'flex-col items-start ltr:pr-0 rtl:pl-0 md:pb-1': variant === 'gridSlim',
                    'transform items-center border border-gray-100 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-listProduct':
                        variant === 'listSmall',
                    'flex-row items-center transition-transform ease-linear ltr:pr-2 rtl:pl-2 ltr:lg:pr-3 rtl:lg:pl-3 ltr:2xl:pr-4 rtl:2xl:pl-4':
                        variant === 'list',
                    '!bg-transparent': variant === 'grid' && bgTransparent === true,
                },
                className
            )}
            onClick={handlePopupView}
            role="button"
            title={product?.name}
        >
            <div
                className={cn(
                    'flex',
                    {
                        'mb-3 md:mb-3.5': variant === 'grid',
                        'mb-3 pb-0 md:mb-3.5': variant === 'gridSlim',
                        'w-32 flex-shrink-0 sm:w-44 md:w-36 lg:w-44': variant === 'listSmall',
                        'relative mb-3 md:mb-3.5':
                            variant === 'gridModern' || variant === 'gridModernWide' || variant === 'gridTrendy',
                    },
                    imageContentClassName
                )}
            >
                <Image
                    src={product?.image?.thumbnail ?? placeholderImage}
                    width={demoVariant === 'ancient' ? 352 : imgWidth}
                    height={demoVariant === 'ancient' ? 452 : imgHeight}
                    loading={imgLoading}
                    quality={100}
                    alt={product?.name || 'Product Image'}
                    className={cn(`bg-gray-300 object-cover ${!disableBorderRadius && 'rounded-s-md'}`, {
                        'w-full transition duration-200 ease-in':
                            variant === 'grid' ||
                            variant === 'gridModern' ||
                            variant === 'gridModernWide' ||
                            variant === 'gridTrendy',
                        'rounded-md group-hover:rounded-b-none':
                            (variant === 'grid' && !disableBorderRadius) ||
                            (variant === 'gridModern' && !disableBorderRadius) ||
                            (variant === 'gridModernWide' && !disableBorderRadius) ||
                            (variant === 'gridTrendy' && !disableBorderRadius),
                        'transform rounded-md transition duration-150 ease-linear group-hover:scale-105':
                            variant === 'gridSlim',
                        'transform rounded-s-md transition duration-200 ease-linear group-hover:scale-105':
                            variant === 'list',
                    })}
                />

                <div className="absolute top-3.5 flex flex-col items-start gap-y-1 ltr:left-3.5 rtl:right-3.5 md:top-5 ltr:md:left-5 rtl:md:right-5 3xl:top-7 ltr:3xl:left-7 rtl:3xl:right-7">
                    {discount &&
                        (variant === 'gridModernWide' || variant === 'gridModern' || variant === 'gridTrendy') && (
                            <span className="inline-block rounded-md bg-heading px-1 py-0.5 text-10px leading-5 text-white sm:px-1.5 sm:py-1 md:text-xs xl:px-2">
                                <p>
                                    <span className="sm:hidden">-</span>
                                    {discount} <span className="hidden sm:inline">OFF</span>
                                </p>
                            </span>
                        )}

                    {product?.isNewArrival &&
                        (variant === 'gridModernWide' || variant === 'gridModern' || variant === 'gridTrendy') && (
                            <span className="inline-block rounded-md bg-[#B26788] px-1.5 py-0.5 text-10px leading-5 text-white sm:px-1.5 sm:py-1 md:text-xs xl:px-2">
                                <p>
                                    New <span className="hidden sm:inline">Arrival</span>
                                </p>
                            </span>
                        )}
                </div>

                {variant === 'gridModernWide' && (
                    <div className="absolute bottom-6 w-[32px] space-y-2 ltr:right-2 rtl:left-2 sm:w-[42px] ltr:sm:right-3 rtl:sm:left-3 lg:w-[52px]">
                        <ProductViewIcon className="w-full transition duration-300 ease-in delay-100 bg-white rounded-md group-hover:opacity-100 sm:opacity-0" />
                        <ProductWishIcon className="w-full transition duration-300 ease-in delay-200 bg-white rounded-md group-hover:opacity-100 sm:opacity-0" />
                        <ProductCompareIcon className="w-full transition duration-300 ease-in delay-300 bg-white rounded-md group-hover:opacity-100 sm:opacity-0" />
                    </div>
                )}
            </div>
            <div
                className={cn(
                    'w-full overflow-hidden p-2',
                    {
                        'md:px-2.5 xl:px-4': variant === 'grid',

                        'flex h-full flex-col px-2 md:px-2.5 xl:px-4':
                            variant === 'gridModern' || variant === 'gridModernWide' || variant === 'gridTrendy',

                        'ltr:pl-0 rtl:pr-0': variant === 'gridSlim',
                        'px-4 lg:px-5 2xl:px-4': variant === 'listSmall',
                    },
                    contactClassName
                )}
            >
                {(variant === 'gridModern' || variant === 'gridModernWide' || variant === 'gridTrendy') && (
                    <div className="flex items-center py-2 gap-x-2">
                        <svg
                            className="h-4 w-4 text-[#FBD103] sm:h-6 sm:w-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="text-xs font-semibold truncate text-heading sm:text-sm">4.5</span>
                        {product.quantity === 0 && (
                            <span className="text-xs font-semibold leading-5 text-[#EF4444] ltr:pl-3 rtl:pr-3 sm:text-sm">
                                Out of stock
                            </span>
                        )}
                    </div>
                )}
                {!!(showCategory || showRating) && (
                    <div className="mb-0.5 flex flex-col items-start md:flex-row md:items-center lg:flex-row  xl:flex-row 2xl:flex-row">
                        {!!showCategory && (
                            <h3
                                className={cn(
                                    'mb-1 text-sm font-semibold ltr:mr-2 rtl:ml-2 md:mb-0 ltr:md:mr-3 rtl:md:ml-3',
                                    {
                                        'text-white': bgTransparent,
                                        'text-black/70': !bgTransparent,
                                    }
                                )}
                            >
                                Category
                            </h3>
                        )}
                        {!!showRating && <RatingDisplay rating={2.5} />}
                    </div>
                )}
                <h2
                    className={cn('mb-1 truncate', {
                        'text-sm md:text-base': variant === 'grid',
                        'font-semibold': demoVariant !== 'ancient',
                        'font-bold': demoVariant === 'ancient',
                        'text-xs sm:text-sm md:text-base':
                            variant === 'gridModern' || variant === 'gridModernWide' || variant === 'gridTrendy',
                        'text-sm sm:text-base md:mb-1.5 md:text-sm lg:text-base xl:text-lg': variant === 'gridSlim',
                        'pb-0 text-sm sm:text-base md:mb-1.5': variant === 'listSmall',
                        'text-sm sm:text-base md:mb-1.5 md:text-sm lg:text-base xl:text-lg': variant === 'list',
                        'text-white': bgTransparent,
                        'text-heading': !bgTransparent,
                    })}
                >
                    {product?.name}
                </h2>
                {!hideProductDescription && product?.description && (
                    <p className="max-w-[250px] truncate text-xs leading-normal text-body lg:text-sm xl:leading-relaxed">
                        {product?.description}
                    </p>
                )}
                <div
                    className={`mt-1.5 flex flex-wrap gap-x-2 text-sm font-semibold sm:text-base ${
                        variant === 'grid'
                            ? 'lg:mt-2.5 lg:text-lg'
                            : 'sm:text-xl md:mt-2.5 md:text-base lg:text-xl 2xl:mt-3'
                    }
          ${
              variant === 'gridModern' || variant === 'gridModernWide' || variant === 'gridTrendy'
                  ? '!mt-auto flex flex-col-reverse !gap-x-0'
                  : ''
          } ${bgTransparent ? 'text-white' : 'text-heading'}`}
                >
                    <span className={`inline-block ${demoVariant === 'ancient' && 'text-lg font-bold text-gray-900'}`}>
                        {price}
                    </span>
                    {discount && (
                        <del
                            className={`font-normal sm:text-base ${bgTransparent ? 'text-white/70' : 'text-gray-800'}`}
                        >
                            {basePrice}
                        </del>
                    )}
                </div>
            </div>

            {(variant === 'gridTrendy' || variant === 'gridModern') && (
                <div className="absolute flex bottom-2 gap-x-2 ltr:right-2 rtl:left-2">
                    <ProductWishIcon className="w-[35px] rounded-md bg-[#F1F3F4] transition delay-200 duration-300 ease-in group-hover:opacity-100 sm:w-[42px] sm:opacity-0 lg:w-[52px]" />
                    <ProductCompareIcon className="w-[35px] rounded-md bg-[#F1F3F4] transition delay-300 duration-300 ease-in group-hover:opacity-100 sm:w-[42px] sm:opacity-0 lg:w-[52px]" />
                </div>
            )}
        </div>
    );
};

export default ProductCard;
