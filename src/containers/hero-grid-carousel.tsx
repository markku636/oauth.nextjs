import BannerCard from '@components/common/banner-card';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import { homeHeroGridSlider as banners } from '@framework/static/banner';
import { TEMPLATE_ROUTES } from '@utils/routes';
import { SwiperSlide } from 'swiper/react';

interface HeroGridProps {
    className?: string;
}

const breakpoints = {
    '1720': {
        slidesPerView: 3,
        spaceBetween: 12,
    },
    '1366': {
        slidesPerView: 3,
        spaceBetween: 12,
    },
    '1025': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const HeroGridCarousel: React.FC<HeroGridProps> = ({ className = 'mb-12 md:mb-14 xl:mb-16' }) => {
    return (
        <div className={`heightFull ${className}`}>
            <CarouselTemplate
                autoplay={{
                    delay: 4000,
                }}
                breakpoints={breakpoints}
                buttonGroupClassName="hidden"
                scrollbar={{ draggable: true, hide: false }}
                className="hero-grid-carousel"
            >
                {banners?.map((banner) => (
                    <SwiperSlide key={`hero-banner-grid--key-${banner.id}`}>
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

export default HeroGridCarousel;
