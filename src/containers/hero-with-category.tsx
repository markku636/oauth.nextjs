'use client';
import { useSsrCompatible } from '@/hooks/use-ssr-compatible';
import { useWindowSize } from '@/hooks/use-window-size';
import BannerCard from '@components/common/banner-card';
import CategoryListCard from '@components/common/category-list-card';
import Alert from '@components/ui/alert';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import CategoryListFeedLoader from '@components/ui/loaders/category-list-feed-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { TEMPLATE_ROUTES } from '@utils/routes';
import { SwiperSlide } from 'swiper/react';

interface Props {
    className?: string;
    paginationPosition?: 'left' | 'center';
    bannerData?: any;
}

const categoryResponsive = {
    '1280': {
        slidesPerView: 4,
        spaceBetween: 28,
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    '480': {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    '0': {
        slidesPerView: 1,
        spaceBetween: 12,
    },
};

const HeroWithCategory: React.FC<Props> = ({
    className = 'mb-12 md:mb-14 xl:mb-16',
    paginationPosition = 'center',
    bannerData,
}) => {
    const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
    const { data, isLoading, error } = useCategoriesQuery({
        limit: 10,
    });

    return (
        <div className={`grid grid-cols-1 gap-5 xl:gap-7 2xl:grid-cols-5 ${className}`}>
            {error ? (
                <Alert message={error?.message} />
            ) : width < 1500 ? (
                <div>
                    <CarouselTemplate
                        autoplay={{
                            delay: 3000,
                        }}
                        breakpoints={categoryResponsive}
                        buttonSize="small"
                    >
                        {!data?.categories?.data?.length && isLoading
                            ? Array.from({ length: 8 }).map((_, idx) => (
                                  <SwiperSlide key={`category-list-${idx}`}>
                                      <CategoryListCardLoader uniqueKey={`category-list-${idx}`} />
                                  </SwiperSlide>
                              ))
                            : data?.categories?.data?.map((category) => (
                                  <SwiperSlide key={`category--key${category.id}`}>
                                      <CategoryListCard category={category} />
                                  </SwiperSlide>
                              ))}
                    </CarouselTemplate>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 ltr:2xl:-mr-14 rtl:2xl:-ml-14">
                    {!data?.categories?.data?.length && isLoading ? (
                        <CategoryListFeedLoader limit={8} />
                    ) : (
                        data?.categories?.data
                            ?.slice(0, 8)
                            .map((category) => (
                                <CategoryListCard key={`category--key${category.id}`} category={category} />
                            ))
                    )}
                </div>
            )}

            <div className="heightFull col-span-full row-span-full 2xl:col-span-4 2xl:row-auto ltr:2xl:ml-14 rtl:2xl:mr-14">
                <CarouselTemplate
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 5000,
                    }}
                    className="-mx-0"
                    buttonGroupClassName="hidden"
                    paginationPosition={paginationPosition}
                >
                    {bannerData?.map((banner: any) => (
                        <SwiperSlide key={`banner--key${banner.id}`}>
                            <BannerCard
                                banner={banner}
                                href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner.slug}`}
                                className="xl:h-full"
                            />
                        </SwiperSlide>
                    ))}
                </CarouselTemplate>
            </div>
        </div>
    );
};

export default HeroWithCategory;
