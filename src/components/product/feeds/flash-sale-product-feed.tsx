'use client';
import BannerCard from '@components/common/banner-card';
import SellWithProgress from '@components/common/sale-with-progress';
import Alert from '@components/ui/alert';
import { useFlashSaleProductsQuery } from '@framework/product/get-all-flash-sale-products';
import { TEMPLATE_ROUTES } from '@utils/routes';
import classNames from 'classnames';

interface Props {
    className?: string;
}

const banner = {
    id: 1,
    title: 'banner-on-selected-items',
    slug: "men's-collection",
    image: {
        mobile: {
            url: '/assets/images/banner/banner-mobile-2.jpg',
            width: 450,
            height: 150,
        },
        desktop: {
            url: '/assets/images/banner/banner-2.jpg',
            width: 1190,
            height: 450,
        },
    },
};

const flashSaleCarouselBreakpoint = {
    '1280': {
        slidesPerView: 1,
    },
    '768': {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    '0': {
        slidesPerView: 1,
    },
};

const FlashSaleBlock: React.FC<Props> = ({ className = 'mb-12 lg:mb-14 xl:mb-7' }) => {
    const { data, isLoading, error } = useFlashSaleProductsQuery({
        limit: 10,
    });

    return (
        <div
            className={classNames(
                `grid grid-cols-1 gap-y-12 lg:gap-y-14 xl:grid-cols-3 xl:gap-x-7 xl:gap-y-0`,
                className
            )}
        >
            <BannerCard
                key={`banner--key${banner.id}`}
                banner={banner}
                href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner.slug}`}
                className="xl:col-span-2 xl:h-full"
                effectActive={true}
            />
            {error ? (
                <Alert message={error?.message} />
            ) : (
                <SellWithProgress
                    carouselBreakpoint={flashSaleCarouselBreakpoint}
                    products={data?.productFlashSellList}
                    loading={isLoading}
                    className="col-span-full lg:mb-1 xl:col-span-1 xl:mb-0"
                />
            )}
        </div>
    );
};

export default FlashSaleBlock;
