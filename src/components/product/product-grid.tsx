'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import ProductCard from '@components/product/product-card';
import Button from '@components/ui/button';
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader';
import { useProductsQuery } from '@framework/product/get-all-products';
import { Product } from '@framework/types';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
interface ProductGridProps {
    className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = '' }) => {
    const { query } = useRouter();
    const {
        isFetching: isLoading,
        isFetchingNextPage: loadingMore,
        fetchNextPage,
        hasNextPage,
        data,
        error,
    } = useProductsQuery({ limit: 10, ...query });

    if (error) {
        return <p>{error.message}</p>;
    }

    const t = useTranslationsCommon();

    return (
        <>
            <div
                className={`grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 lg:gap-x-5 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-5 2xl:grid-cols-5 2xl:gap-y-8 ${className}`}
            >
                {isLoading && !data?.pages?.length ? (
                    <ProductFeedLoader limit={20} uniqueKey="search-product" />
                ) : (
                    data?.pages?.map((page) => {
                        return page?.data?.map((product: Product) => (
                            <ProductCard key={`product--key${product.id}`} product={product} variant="grid" />
                        ));
                    })
                )}
            </div>
            <div className="pt-8 text-center xl:pt-14">
                {hasNextPage && (
                    <Button loading={loadingMore} disabled={loadingMore} onClick={() => fetchNextPage()} variant="slim">
                        {t('button-load-more')}
                    </Button>
                )}
            </div>
        </>
    );
};
