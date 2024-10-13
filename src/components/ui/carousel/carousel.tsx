'use client';
import cn from '@utils/classname/cn';
import { ReactNode } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperProps } from 'swiper/react';

interface ICarousel {
    className?: string;
    children: ReactNode;
    loop?: boolean;
    onNextClick?: () => void;
    onPrevClick?: () => void;
    buttonGroupClassName?: string;
    prevButtonClassName?: string;
    nextButtonClassName?: string;
    breakpoints?: SwiperProps['breakpoints'];
    pagination?: SwiperProps['pagination'];
    navigation?: SwiperProps['navigation'];
    scrollbar?: SwiperProps['scrollbar'];
    autoplay?: SwiperProps['autoplay'];
}

// extend the navigation/pagination variants as needed
export default function Carousel({
    children,
    className,
    loop = false,
    autoplay = false,
    navigation = true,
    pagination = true,
    buttonGroupClassName = '',
    prevButtonClassName = '',
    nextButtonClassName = '',
    breakpoints,
    ...props
}: Readonly<ICarousel>) {
    return (
        <div className={cn('relative', className)}>
            <Swiper
                modules={[Navigation, Autoplay, Pagination, Scrollbar]}
                loop={loop}
                slidesPerView="auto"
                autoplay={autoplay}
                breakpoints={breakpoints}
                pagination={pagination}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                {...props}
            >
                {children}
            </Swiper>
            {navigation && (
                <div
                    className={cn(
                        'absolute top-1/2 z-10 flex px-2 w-full items-center justify-between',
                        buttonGroupClassName
                    )}
                >
                    <button className={cn('swiper-button-prev', prevButtonClassName)} aria-label="prev-button">
                        <IoIosArrowBack />
                    </button>
                    <button className={cn('swiper-button-next', nextButtonClassName)} aria-label="next-button">
                        <IoIosArrowForward />
                    </button>
                </div>
            )}
        </div>
    );
}
