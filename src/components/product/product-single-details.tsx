'use client';
import { useSsrCompatible } from '@/hooks/use-ssr-compatible';
import { useWindowSize } from '@/hooks/use-window-size';
import Counter from '@components/common/counter';
import ProductMetaReview from '@components/product/product-meta-review';
import Button from '@components/ui/button';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import Link from '@components/ui/link';
import { useProductQuery } from '@framework/product/get-product';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from 'src/app/context/cart/cart.context';
import { SwiperSlide } from 'swiper/react';
import { ProductAttributes } from './product-attributes';

const productGalleryCarouselResponsive = {
    '768': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const ProductSingleDetails = () => {
    const {
        query: { slug },
    } = useRouter();
    const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
    const { data, isLoading } = useProductQuery(slug as string);
    const { addItemToCart } = useCart();
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
    const [quantity, setQuantity] = useState(1);
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
    const { price, basePrice, discount } = usePrice(
        data && {
            amount: data.sale_price ? data.sale_price : data.price,
            baseAmount: data.price,
            currencyCode: 'USD',
        }
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }
    const variations = getVariations(data?.variations);

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
        }, 600);

        const item = generateCartItem(data!, attributes);

        addItemToCart(item, quantity);
        toast('Added to the bag', {
            progressClassName: 'fancy-progress-bar',
            position: width > 768 ? 'bottom-right' : 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        console.log(item, 'item');
    }

    function handleAttribute(attribute: any) {
        setAttributes((prev) => ({
            ...prev,
            ...attribute,
        }));
    }

    return (
        <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
            {width < 1025 ? (
                <CarouselTemplate
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={productGalleryCarouselResponsive}
                    className="product-gallery"
                    buttonGroupClassName="hidden"
                >
                    {data?.gallery?.map((item, index: number) => (
                        <SwiperSlide key={`product-gallery-key-${index}`}>
                            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                                <img
                                    src={item?.original ?? '/assets/placeholder/products/product-gallery.svg'}
                                    alt={`${data?.name}--${index}`}
                                    className="w-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </CarouselTemplate>
            ) : (
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {data?.gallery?.map((item, index: number) => (
                        <div key={index} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                            <img
                                src={item?.original ?? '/assets/placeholder/products/product-gallery.svg'}
                                alt={`${data?.name}--${index}`}
                                className="w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="col-span-4 pt-8 lg:pt-0">
                <div className="mb-7 border-b border-gray-300 pb-7">
                    <h2 className="mb-3.5 text-lg font-bold text-heading hover:text-black md:text-xl lg:text-2xl 2xl:text-3xl">
                        {data?.name}
                    </h2>
                    <p className="text-sm leading-6 text-body lg:text-base lg:leading-8">{data?.description}</p>
                    <div className="mt-5 flex items-center">
                        <div className="text-base font-bold text-heading ltr:pr-2 rtl:pl-2 md:text-xl ltr:md:pr-0 rtl:md:pl-0 lg:text-2xl ltr:lg:pr-2 rtl:lg:pl-2 2xl:text-4xl ltr:2xl:pr-0 rtl:2xl:pl-0">
                            {price}
                        </div>
                        {discount && (
                            <span className="font-segoe text-sm text-gray-400 line-through ltr:pl-2 rtl:pr-2 md:text-base lg:text-lg xl:text-xl">
                                {basePrice}
                            </span>
                        )}
                    </div>
                </div>

                <div className="border-b border-gray-300 pb-3">
                    {Object.keys(variations).map((variation) => {
                        return (
                            <ProductAttributes
                                key={variation}
                                title={variation}
                                attributes={variations[variation]}
                                active={attributes[variation]}
                                onClick={handleAttribute}
                            />
                        );
                    })}
                </div>
                <div className="flex items-center gap-x-4 border-b border-gray-300 py-8 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32  rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48">
                    <Counter
                        quantity={quantity}
                        onIncrement={() => setQuantity((prev) => prev + 1)}
                        onDecrement={() => setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
                        disableDecrement={quantity === 1}
                    />
                    <Button
                        onClick={addToCart}
                        variant="slim"
                        className={`w-full md:w-6/12 xl:w-full ${!isSelected && 'bg-gray-400 hover:bg-gray-400'}`}
                        disabled={!isSelected}
                        loading={addToCartLoader}
                    >
                        <span className="py-2 3xl:px-8">Add to cart</span>
                    </Button>
                </div>
                <div className="py-6">
                    <ul className="space-y-5 pb-1 text-sm">
                        <li>
                            <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">SKU:</span>
                            {data?.sku}
                        </li>
                        <li>
                            <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">Category:</span>
                            <Link href="/" className="transition hover:text-heading hover:underline">
                                {data?.category?.name}
                            </Link>
                        </li>
                        {data?.tags && Array.isArray(data.tags) && (
                            <li className="productTags">
                                <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">Tags:</span>
                                {data.tags.map((tag) => (
                                    <Link
                                        key={tag.id}
                                        href={tag.slug}
                                        className="inline-block transition hover:text-heading hover:underline ltr:pr-1.5 ltr:last:pr-0 rtl:pl-1.5 rtl:last:pl-0"
                                    >
                                        {tag.name}
                                        <span className="text-heading">,</span>
                                    </Link>
                                ))}
                            </li>
                        )}
                    </ul>
                </div>

                <ProductMetaReview data={data} />
            </div>
        </div>
    );
};

export default ProductSingleDetails;
