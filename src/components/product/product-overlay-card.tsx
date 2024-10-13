'use client';
import Image from 'next/image';

import { useAppDispatch } from '@/redux/features/hooks';
import { openModal, setModalData, setModalView } from '@/redux/features/ui/ui-slice';
import Text from '@components/ui/text';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import cn from 'classnames';

interface ProductProps {
    product: Product;
    index: number;
    imgLoading?: 'eager' | 'lazy';
    variant?: 'left' | 'center' | 'combined' | 'flat' | 'modern';
    disableBorderRadius?: boolean;
}

const ProductOverlayCard: React.FC<ProductProps> = ({
    product,
    index,
    variant = 'left',
    imgLoading = 'lazy',
    disableBorderRadius = false,
}) => {
    let size = 260;
    let classes;

    if (
        (variant === 'left' && index === 0) ||
        (variant === 'center' && index === 1) ||
        (variant === 'combined' && index === 0)
    ) {
        classes = 'row-span-full lg:row-span-2 col-span-full lg:col-span-2';
        size = 620;
    } else if (variant === 'combined') {
        if (index === 2) {
            classes = 'col-span-2 lg:col-span-1 lg:row-span-2';
            size = 620;
        } else {
            classes = 'col-span-2 lg:col-span-1';
            size = 620;
        }
    } else if (variant === 'modern') {
        classes = 'col-span-2 md:row-span-2';
        size = 620;
    } else {
        classes = 'col-span-2 lg:col-span-1';
    }

    const dispatch = useAppDispatch();

    // const { openModal, setModalView, setModalData } = useUI();

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
            onClick={handlePopupView}
            className={`${classes} group flex cursor-pointer flex-col bg-gray-200 ${
                !disableBorderRadius && 'rounded-md'
            } relative items-center justify-between overflow-hidden`}
        >
            <div
                className={cn('flex h-full items-center justify-center p-4 3xl:min-h-[330px]', {
                    '!p-0': variant === 'modern',
                })}
                title={product?.name}
            >
                <Image
                    src={product?.image?.original ?? '/assets/placeholder/products/product-featured.png'}
                    width={size}
                    height={size}
                    objectFit="contain"
                    loading={imgLoading}
                    alt={product?.name || 'Product Image'}
                    className="transform transition duration-500 ease-in-out group-hover:scale-110"
                />
            </div>

            {variant === 'modern' && (
                <span
                    className={cn(
                        'absolute top-3.5 inline-block bg-[#B26788] px-2 pb-1 pt-0.5 text-10px leading-5 text-white ltr:left-3.5 rtl:right-3.5 md:top-5 md:text-sm ltr:md:left-5 rtl:md:right-5 xl:px-3 3xl:top-7 ltr:3xl:left-7 rtl:3xl:right-7',
                        {
                            '!py-0.5': variant === 'modern',
                            'rounded-md ': !disableBorderRadius,
                        }
                    )}
                >
                    Featured
                </span>
            )}

            {discount && (
                <span
                    className={cn(
                        'absolute top-3.5 inline-block rounded-md bg-heading px-2 pb-1 pt-0.5 text-10px leading-5 text-white ltr:left-3.5 rtl:right-3.5 md:top-5 md:text-sm ltr:md:left-5 rtl:md:right-5 xl:px-3 3xl:top-7 ltr:3xl:left-7 rtl:3xl:right-7',
                        {
                            'right-3.5 bg-transparent font-bold text-[#22C55E] ltr:!left-auto rtl:!right-auto md:right-5 3xl:right-7':
                                variant === 'modern',
                        }
                    )}
                >
                    {discount} {variant === 'modern' && ' off'}
                </span>
            )}

            <div
                className="flex w-full flex-col px-4 pb-4 md:flex-row md:items-center md:justify-between md:px-5 md:pb-5 lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center 3xl:px-7 3xl:pb-7"
                title={product?.name}
            >
                <div className="overflow-hidden ltr:md:pr-2 rtl:md:pl-2 ltr:lg:pr-0 rtl:lg:pl-0 ltr:2xl:pr-2 rtl:2xl:pl-2">
                    <h2 className="mb-1 truncate text-sm font-semibold text-heading md:text-base xl:text-lg">
                        {product?.name}
                    </h2>

                    {variant !== 'modern' ? (
                        <p className="max-w-[250px] truncate text-xs leading-normal text-body xl:text-sm xl:leading-relaxed">
                            {product?.description}
                        </p>
                    ) : (
                        <Text className="truncate pb-0.5">35 Brands, 1000+ Products</Text>
                    )}
                </div>

                {variant !== 'modern' && (
                    <div className="mt-2 flex flex-shrink-0 flex-row-reverse items-center justify-end rtl:text-right md:-mt-0.5 md:flex-col md:items-end ltr:md:text-right rtl:md:text-left lg:mt-2 lg:flex-row-reverse lg:items-start lg:ltr:text-left ltr:xl:text-right rtl:xl:text-left 2xl:-mt-0.5 2xl:flex-col 2xl:items-end">
                        {discount && (
                            <del className="text-sm md:text-base lg:text-sm xl:text-base 3xl:text-lg">{basePrice}</del>
                        )}
                        <div className="font-segoe text-base font-semibold text-heading ltr:pr-2 rtl:pl-2 md:text-xl ltr:md:pr-0 rtl:md:pl-0 lg:text-base ltr:lg:pr-2 rtl:lg:pl-2 xl:text-xl ltr:2xl:pr-0 rtl:2xl:pl-0 3xl:mt-0.5 3xl:text-2xl">
                            {price}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductOverlayCard;
