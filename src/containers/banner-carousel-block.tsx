'use client';
import BannerCard from '@components/common/banner-card';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import { TEMPLATE_ROUTES } from '@utils/routes';
import { SwiperSlide } from 'swiper/react';

const breakpoints = {
    '1025': {
        slidesPerView: 3,
        spaceBetween: 28,
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

interface BannerProps {
    className?: string;
    bannerData: any;
}

const BannerCarouselBlock: React.FC<BannerProps> = ({
    className = 'mb-12 md:mb-12 lg:mb-14 pb-0.5 xl:pb-1.5',
    bannerData,
}) => {
    return (
        <div className={className}>
            <CarouselTemplate breakpoints={breakpoints} autoplay={{ delay: 5000 }}>
                {bannerData?.map((banner: any) => (
                    <SwiperSlide key={`promotion-banner-key-${banner?.id}`}>
                        <BannerCard
                            banner={banner}
                            href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner.slug}`}
                            effectActive={true}
                        />
                    </SwiperSlide>
                ))}
            </CarouselTemplate>
        </div>
    );
};

export default BannerCarouselBlock;
