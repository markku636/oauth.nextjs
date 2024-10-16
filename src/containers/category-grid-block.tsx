'use client';
import { useSsrCompatible } from '@/hooks/use-ssr-compatible';
import { useWindowSize } from '@/hooks/use-window-size';
import CategoryCard from '@components/common/category-card';
import SectionHeader from '@components/common/section-header';
import Alert from '@components/ui/alert';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import { useFeaturedCategoriesQuery } from '@framework/category/get-all-featured-categories';
import { SwiperSlide } from 'swiper/react';

interface CategoriesProps {
    sectionHeading: string;
    className?: string;
}

const breakpoints = {
    '1220': {
        slidesPerView: 4,
        spaceBetween: 28,
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    '440': {
        slidesPerView: 2,
        spaceBetween: 12,
    },
    '0': {
        slidesPerView: 1,
        spaceBetween: 12,
    },
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
    sectionHeading = 'text-section-title',
    className = 'mb-12 md:mb-14 xl:mb-16',
}) => {
    const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
    const { data, isLoading, error } = useFeaturedCategoriesQuery({
        limit: 10,
    });

    return (
        <div className={className}>
            <SectionHeader sectionHeading={sectionHeading} />
            {error ? (
                <Alert message={error?.message} />
            ) : (
                <>
                    {width < 1025 ? (
                        <div className="relative">
                            <CarouselTemplate
                                breakpoints={breakpoints}
                                autoplay={{
                                    delay: 4000,
                                }}
                            >
                                {isLoading
                                    ? Array.from({ length: 6 }).map((_, idx) => (
                                          <SwiperSlide key={idx}>
                                              <CategoryCardLoader uniqueKey={`featured-category-${idx}`} />
                                          </SwiperSlide>
                                      ))
                                    : data?.map((category) => (
                                          <SwiperSlide key={`category--key${category.id}`}>
                                              <CategoryCard category={category} />
                                          </SwiperSlide>
                                      ))}
                            </CarouselTemplate>
                        </div>
                    ) : (
                        <div className="lg:grid lg:grid-cols-3 lg:gap-5 xl:gap-7">
                            {isLoading
                                ? Array.from({ length: 6 }).map((_, idx) => (
                                      <CategoryCardLoader key={idx} uniqueKey={`featured-category-${idx}`} />
                                  ))
                                : data?.map((category) => (
                                      <CategoryCard key={`category--key${category.id}`} category={category} />
                                  ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryGridBlock;
