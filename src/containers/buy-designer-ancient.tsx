'use client';
import ProductCard from '@components/product/product-card';
import Alert from '@components/ui/alert';
import Container from '@components/ui/container';
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader';
import { Product } from '@framework/types';

import { useNewArrivalProductsQuery } from '@framework/product/get-all-new-arrival-products';

interface Props {
    imgWidth?: number;
    imgHeight?: number;
}

const BuyDesignerAncient: React.FC<Props> = ({ imgWidth, imgHeight }) => {
    const {
        data: products,
        isLoading,
        error,
    }: any = useNewArrivalProductsQuery({
        limit: 10,
    });

    return (
        // <div className="pt-6 pb-5 mb-10 bg-black md:pt-12 md:pb-7 md:mb-12 xl:mb-14 2xl:mb-20">
        <div className="mb-7 bg-black pb-5 pt-6 md:mb-10 md:pb-7 md:pt-12 lg:mb-12 xl:mb-14 2xl:mb-[75px]">
            <Container>
                <div className="flex flex-col sm:flex-col md:flex-col md:items-center lg:flex-row xl:flex-row xl:items-center 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-x-3">
                    <div className="mb-8 sm:mb-10 md:mb-12 2xl:w-[650px]">
                        <h2 className="mb-3 text-[24px] font-bold leading-[1.6] text-white md:mb-4 md:text-[24px] lg:mb-4 lg:text-[30px] xl:mb-4 2xl:mb-4 2xl:text-[38px] 3xl:text-[48px]">
                            Buy Designer <br /> Dress For Anything
                        </h2>
                        <div className="mb-6 text-base leading-8 text-white ltr:pr-4 rtl:pl-4 md:mb-8 md:text-base md:leading-8 lg:mb-10 lg:text-base lg:leading-8 xl:mb-10 xl:text-base xl:leading-8 2xl:text-lg 2xl:leading-8 3xl:text-lg 3xl:leading-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices
                            sollicitudin aliquam.
                        </div>
                        <button className="bg-white px-6 py-3 text-sm font-semibold leading-[28px] text-black duration-300 hover:bg-white/80 lg:px-8 lg:py-4 xl:px-8 xl:py-4 2xl:px-8">
                            Go to collection
                        </button>
                    </div>
                    <div className="2xl-w-auto grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                        {error ? (
                            <Alert message={error.toString()} />
                        ) : (
                            <>
                                {isLoading && !products?.length ? (
                                    <ProductFeedLoader limit={3} uniqueKey={'hire-designer'} />
                                ) : (
                                    products
                                        ?.slice(0, 3)
                                        ?.map((product: Product) => (
                                            <ProductCard
                                                showCategory={true}
                                                showRating={true}
                                                hideProductDescription={true}
                                                key={`product--key${product.id}`}
                                                product={product}
                                                imgWidth={imgWidth}
                                                imgHeight={imgHeight}
                                                variant={'grid'}
                                                bgTransparent={true}
                                                disableBorderRadius={true}
                                            />
                                        ))
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BuyDesignerAncient;
