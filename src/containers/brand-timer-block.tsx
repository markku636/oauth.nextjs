'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import SectionHeader from '@components/common/section-header';
import Alert from '@components/ui/alert';
import CarouselTemplate from '@components/ui/carousel/carousel-template';
import Link from '@components/ui/link';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
import { useBrandsQuery } from '@framework/brand/get-all-brands';
import { Brand } from '@framework/types';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';

const Countdown = dynamic(() => import('react-countdown'), { ssr: false });

interface BrandProps {
    sectionHeading: string;
    className?: string;
    date?: any;
}

const breakpoints = {
    '1720': {
        slidesPerView: 8,
        spaceBetween: 28,
    },
    '1400': {
        slidesPerView: 7,
        spaceBetween: 28,
    },
    '1025': {
        slidesPerView: 6,
        spaceBetween: 20,
    },
    '768': {
        slidesPerView: 5,
        spaceBetween: 20,
    },
    '500': {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    '0': {
        slidesPerView: 3,
        spaceBetween: 12,
    },
};

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
        // Render a completed state
        return <span>Time Over!</span>;
    }
    // Render a countdown
    return (
        <div className="hidden items-center gap-x-1.5 sm:flex md:gap-x-2.5">
            <div className="text-center text-10px uppercase text-white md:text-xs">
                <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-md text-xs text-white md:h-10 md:w-10 md:text-sm">
                    {days}
                </span>
                days
            </div>
            <div className="text-center text-10px uppercase text-white md:text-xs">
                <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-md text-xs text-white md:h-10 md:w-10 md:text-sm">
                    {hours}
                </span>
                hours
            </div>
            <div className="text-center text-10px uppercase text-white md:text-xs">
                <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-md text-xs text-white md:h-10 md:w-10 md:text-sm">
                    {minutes}
                </span>
                mins
            </div>
            <div className="text-center text-10px uppercase text-white md:text-xs">
                <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-md text-xs text-white md:h-10 md:w-10 md:text-sm">
                    {seconds}
                </span>
                secs
            </div>
        </div>
    );
};

const BrandTimerBlock: React.FC<BrandProps> = ({
    className = 'mb-12 lg:mb-14 xl:mb-16',
    sectionHeading,
    date = '2023-12-01T01:02:03',
}) => {
    const t = useTranslationsCommon();
    const { data, isLoading, error } = useBrandsQuery({
        limit: 8,
    });
    const brands = data?.brandsTimer;

    return (
        <div className={`rounded-[10px] bg-[#004743] p-5 sm:p-11 ${className}`}>
            <div className="mb-5 flex flex-wrap items-center justify-between md:mb-6">
                <SectionHeader sectionHeading={t(sectionHeading)} textClassName="!text-white" />
                <Countdown date={date} intervalDelay={1000} renderer={renderer} />
            </div>

            <p className="!mb-11 mt-[-30px] text-sm leading-6 text-white md:text-lg md:leading-7">
                {t('text-upto')}
                <span className="font-bold ltr:ml-2 rtl:mr-2">{t('text-60%-discount')}</span>
            </p>

            {error ? (
                <Alert message={error?.message} />
            ) : (
                <CarouselTemplate
                    breakpoints={breakpoints}
                    className="mt-[-20px] sm:mt-[-10px]"
                    autoplay={{
                        delay: 4000,
                    }}
                    navigation={false}
                >
                    {isLoading && !data
                        ? Array.from({ length: 10 }).map((_, idx) => (
                              <SwiperSlide key={idx}>
                                  <CardRoundedLoader uniqueKey={`category-${idx}`} />
                              </SwiperSlide>
                          ))
                        : brands?.map((brand: Brand) => (
                              <SwiperSlide key={`brand--key${brand.id}`}>
                                  <Link href={`/search?q=${brand.slug}`}>
                                      <img src={brand?.image?.original} className="w-[196px]" />
                                  </Link>
                              </SwiperSlide>
                          ))}
                </CarouselTemplate>
            )}
        </div>
    );
};

export default BrandTimerBlock;
