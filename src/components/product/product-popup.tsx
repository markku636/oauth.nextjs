'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { useAppDispatch, useAppSelector } from '@/redux/reducer/hooks';
import { closeModal, openCart, selectUI } from '@/redux/reducer/ui/ui-slice';
import Counter from '@components/common/counter';
import { ProductAttributes } from '@components/product/product-attributes';
import Button from '@components/ui/button';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import { TEMPLATE_ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from 'src/app/context/cart/cart.context';

export default function ProductPopup() {
    const t = useTranslationsCommon();

    const dispatch = useAppDispatch();
    const { modalData } = useAppSelector(selectUI);

    const router = useRouter();
    const { addItemToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
    const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
    const { price, basePrice, discount } = usePrice({
        amount: modalData.sale_price ? modalData.sale_price : modalData.price,
        baseAmount: modalData.price,
        currencyCode: 'USD',
    });
    const variations = getVariations(modalData.variations);
    const { slug, image, name, description } = modalData;

    const isSelected = !isEmpty(variations)
        ? !isEmpty(attributes) && Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation))
        : true;

    function addToCart() {
        if (!isSelected) {
            return;
        }
        // to show btn feedback while product carting
        setAddToCartLoader(true);
        setTimeout(() => {
            setAddToCartLoader(false);
            setViewCartBtn(true);
        }, 600);
        const item = generateCartItem(modalData!, attributes);

        addItemToCart(item, quantity);
        console.log(item, 'item');
    }

    function navigateToProductPage() {
        dispatch(closeModal());
        router.push(`${TEMPLATE_ROUTES.PRODUCT}/${slug}`, undefined, {
            locale: router.locale,
        });
    }

    function handleAttribute(attribute: any) {
        setAttributes((prev) => ({
            ...prev,
            ...attribute,
        }));
    }

    function navigateToCartPage() {
        dispatch(closeModal());
        setTimeout(() => {
            dispatch(openCart());
        }, 300);
    }

    return (
        <div className="rounded-lg bg-white">
            <div className="mx-auto flex w-full flex-col overflow-hidden md:w-[650px] lg:w-[960px] lg:flex-row">
                <div className="flex max-h-430px w-full flex-shrink-0 items-center justify-center overflow-hidden bg-gray-300 lg:max-h-full lg:w-430px">
                    <img
                        src={image?.original ?? '/assets/placeholder/products/product-thumbnail.svg'}
                        alt={name}
                        className="lg:h-full lg:w-full lg:object-cover"
                    />
                </div>

                <div className="flex w-full flex-col p-5 md:p-8">
                    <div className="pb-5">
                        <div className="-mt-1.5 mb-2 block md:mb-2.5" onClick={navigateToProductPage} role="button">
                            <h2 className="text-lg font-semibold text-heading hover:text-black md:text-xl lg:text-2xl">
                                {name}
                            </h2>
                        </div>
                        <p className="text-sm leading-6 md:leading-7 md:text-body">{description}</p>

                        <div className="mt-3 flex items-center">
                            <div className="text-base font-semibold text-heading md:text-xl lg:text-2xl">{price}</div>
                            {discount && (
                                <del className="font-segoe -mt-0.5 text-base text-gray-400 ltr:pl-2.5 rtl:pr-2.5 md:mt-0 lg:text-xl">
                                    {basePrice}
                                </del>
                            )}
                        </div>
                    </div>

                    {Object.keys(variations).map((variation) => {
                        return (
                            <ProductAttributes
                                key={`popup-attribute-key${variation}`}
                                title={variation}
                                attributes={variations[variation]}
                                active={attributes[variation]}
                                onClick={handleAttribute}
                            />
                        );
                    })}

                    <div className="pt-2 md:pt-4">
                        <div className="mb-4 flex items-center justify-between gap-x-3 sm:gap-x-4">
                            <Counter
                                quantity={quantity}
                                onIncrement={() => setQuantity((prev) => prev + 1)}
                                onDecrement={() => setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
                                disableDecrement={quantity === 1}
                            />
                            <Button
                                onClick={addToCart}
                                variant="flat"
                                className={`h-11 w-full px-1.5 md:h-12 ${
                                    !isSelected && 'bg-gray-400 hover:bg-gray-400'
                                }`}
                                disabled={!isSelected}
                                loading={addToCartLoader}
                            >
                                {t('text-add-to-cart')}
                            </Button>
                        </div>

                        {viewCartBtn && (
                            <button
                                onClick={navigateToCartPage}
                                className="mb-4 h-11 w-full rounded border border-gray-300 bg-gray-100 text-heading transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none md:h-12"
                            >
                                {t('text-view-cart')}
                            </button>
                        )}

                        <Button onClick={navigateToProductPage} variant="flat" className="h-11 w-full md:h-12">
                            {t('text-view-details')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
