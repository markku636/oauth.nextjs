'use client';
import { useSsrCompatible } from '@/hooks/use-ssr-compatible';
import { useWindowSize } from '@/hooks/use-window-size';
import BannerCard from '@components/common/banner-card';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import { homeOneHeroBanner as banners } from '@framework/static/banner';
import { TEMPLATE_ROUTES } from '@utils/routes';
import { SwiperSlide } from 'swiper/react';

const breakpoints = {
    '1500': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const HeroBlock = () => {
    const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });

    return (
        <div className="heroBannerOne relative mx-auto mb-5 max-w-[1920px] overflow-hidden px-4 md:mb-12 md:px-8 lg:mb-14 2xl:mb-16 2xl:px-0">
            <CarouselTemplate
                loop={true}
                breakpoints={breakpoints}
                centeredSlides={width < 1500 ? false : true}
                autoplay={{
                    delay: 5000,
                }}
                className="mx-0"
                buttonGroupClassName="hidden"
                pagination={{
                    clickable: true,
                }}
            >
                {banners?.map((banner: any) => (
                    <SwiperSlide className="carouselItem px-0 2xl:px-3.5" key={`banner--key-${banner?.id}`}>
                        <BannerCard banner={banner} href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner.slug}`} />
                    </SwiperSlide>
                ))}
            </CarouselTemplate>
        </div>
    );
};

export default HeroBlock;
