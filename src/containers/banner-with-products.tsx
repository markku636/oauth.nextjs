'use client';

import BannerCard from '@components/common/banner-card';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import Alert from '@components/ui/alert';
import ProductCardListSmallLoader from '@components/ui/loaders/product-card-small-list-loader';
import { useOnSellingProductsQuery } from '@framework/product/get-all-on-selling-products';
import { homeThreeProductsBanner as banner } from '@framework/static/banner';
import { Product } from '@framework/types';
import { TEMPLATE_ROUTES } from '@utils/routes';

interface ProductsProps {
    sectionHeading: string;
    categorySlug?: string;
    className?: string;
    variant?: 'default' | 'reverse';
}

const BannerWithProducts: React.FC<ProductsProps> = ({
    sectionHeading,
    categorySlug,
    variant = 'default',
    className = 'mb-12 md:mb-14 xl:mb-16',
}) => {
    const { data, isLoading, error } = useOnSellingProductsQuery({
        limit: 10,
    });

    return (
        <div className={className}>
            <SectionHeader sectionHeading={sectionHeading} categorySlug={categorySlug} />
            {error ? (
                <Alert message={error?.message} />
            ) : (
                <div className="grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7">
                    {variant === 'reverse' ? (
                        <BannerCard
                            banner={banner[1]}
                            href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner[1].slug}`}
                            className="hidden 3xl:block"
                            effectActive={true}
                        />
                    ) : (
                        <BannerCard
                            banner={banner[0]}
                            href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner[0].slug}`}
                            className="hidden 3xl:block"
                            effectActive={true}
                        />
                    )}
                    <div
                        className={`col-span-full grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-7 3xl:col-span-3 ${
                            variant === 'reverse' ? 'row-span-full' : ''
                        }`}
                    >
                        {isLoading
                            ? Array.from({ length: 9 }).map((_, idx) => (
                                  <ProductCardListSmallLoader key={idx} uniqueKey={`on-selling-${idx}`} />
                              ))
                            : data?.map((product: Product) => (
                                  <ProductCard
                                      key={`product--key${product.id}`}
                                      product={product}
                                      imgWidth={176}
                                      imgHeight={176}
                                      variant="listSmall"
                                  />
                              ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerWithProducts;
