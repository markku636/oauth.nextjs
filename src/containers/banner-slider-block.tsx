'use client';
import BannerCard from '@components/common/banner-card';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import { promotionBanner } from '@framework/static/banner';
import { TEMPLATE_ROUTES } from '@utils/routes';
import { SwiperSlide } from 'swiper/react';

interface BannerProps {
    className?: string;
}

const breakpoints = {
    '0': {
        slidesPerView: 2,
    },
};

const BannerSliderBlock: React.FC<BannerProps> = ({ className = 'mb-12 md:mb-14 xl:mb-16' }) => {
    return (
        <div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
            <div className="-mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
                <CarouselTemplate
                    breakpoints={breakpoints}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    paginationVariant="circle"
                    buttonGroupClassName="hidden"
                >
                    {promotionBanner.map((banner: any) => (
                        <SwiperSlide key={`banner--key${banner.id}`} className="px-1.5 md:px-2.5 xl:px-3.5">
                            <BannerCard
                                banner={banner}
                                effectActive={true}
                                href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner.slug}`}
                            />
                        </SwiperSlide>
                    ))}
                </CarouselTemplate>
            </div>
        </div>
    );
};

export default BannerSliderBlock;
