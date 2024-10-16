import { useSsrCompatible } from '@/hooks/use-ssr-compatible';
import { useWindowSize } from '@/hooks/use-window-size';
import SellWithProgress from '@components/common/sale-with-progress';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import Alert from '@components/ui/alert';
import ProductListFeedLoader from '@components/ui/loaders/product-list-feed-loader';
import { useFlashSaleProductsQuery } from '@framework/product/get-all-flash-sale-products';
import { useTopSellerProductsQuery } from '@framework/product/get-all-top-seller-products';

interface Props {
    className?: string;
    carouselBreakpoint?: {} | any;
}

const ProductsWithFlashSale: React.FC<Props> = ({ className = 'mb-12 md:mb-14 xl:mb-7', carouselBreakpoint }) => {
    const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
    const { data, isLoading, error } = useTopSellerProductsQuery({
        limit: 10,
    });

    const { data: flashSellProduct, isLoading: flashSellProductLoading } = useFlashSaleProductsQuery({
        limit: 10,
    });

    return (
        <div className={`grid grid-cols-1 gap-5 md:gap-14 xl:grid-cols-7 xl:gap-7 2xl:grid-cols-9 ${className}`}>
            <div className="rounded-lg border border-gray-300 px-4 pb-5 pt-6 md:px-5 md:pt-7 lg:px-7 lg:pb-7 lg:pt-9 xl:col-span-5 xl:pt-7 2xl:col-span-7 2xl:pt-9">
                <SectionHeader sectionHeading="text-top-products" categorySlug="/search" />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:-mt-1.5 xl:gap-7 2xl:mt-0">
                    {error ? (
                        <Alert message={error?.message} />
                    ) : !data?.length && isLoading ? (
                        <ProductListFeedLoader limit={4} />
                    ) : (
                        data
                            ?.slice(0, 4)
                            ?.map((product) => (
                                <ProductCard
                                    key={`product--key${product.id}`}
                                    product={product}
                                    imgWidth={265}
                                    imgHeight={265}
                                    imageContentClassName="flex-shrink-0 w-32 sm:w-44 md:w-40 lg:w-52 2xl:w-56 3xl:w-64"
                                    contactClassName="ltr:pl-3.5 rtl:pr-3.5 ltr:sm:pl-5 rtl:sm:pr-5 ltr:md:pl-4 rtl:md:pr-4 ltr:xl:pl-5 rtl:xl:pr-5  ltr:2xl:pl-6 rtl:2xl:pr-6 ltr:3xl:pl-10 rtl:3xl:pr-10"
                                />
                            ))
                    )}
                </div>
            </div>
            {width < 1280 ? (
                <SellWithProgress
                    carouselBreakpoint={carouselBreakpoint}
                    products={flashSellProduct?.productFlashSellGrid}
                    loading={flashSellProductLoading}
                    className="col-span-full row-span-full lg:mb-1 xl:col-span-2 xl:row-auto xl:mb-0"
                />
            ) : (
                <SellWithProgress
                    carouselBreakpoint={carouselBreakpoint}
                    products={flashSellProduct?.productFlashSellGrid}
                    loading={flashSellProductLoading}
                    productVariant="gridSlim"
                    imgWidth={330}
                    imgHeight={330}
                    className="col-span-full row-span-full xl:col-span-2 xl:row-auto"
                />
            )}
        </div>
    );
};

export default ProductsWithFlashSale;
