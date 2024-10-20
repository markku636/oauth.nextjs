'use client';

import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { useLocale } from 'next-intl';
import { useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper } from 'swiper/react';

type CarouselPropsType = {
    children: React.ReactNode;
    className?: string;
    buttonGroupClassName?: string;
    prevActivateId?: string;
    nextActivateId?: string;
    paginationFractionId?: string;
    prevButtonClasses?: string;
    nextButtonClasses?: string;
    buttonSize?: 'default' | 'small';
    paginationVariant?: 'default' | 'circle';
    paginationPosition?: 'center' | 'left' | 'right';
    loop?: boolean;
    centeredSlides?: boolean;
    breakpoints?: {} | any;
    pagination?: {} | any;
    navigation?: {} | any;
    scrollbar?: {} | any;
    autoplay?: {} | any;
    type?: 'rounded' | 'circle' | 'list';
    isFraction?: boolean;
};

const CarouselTemplate: React.FunctionComponent<CarouselPropsType> = ({
    children,
    className = '',
    buttonGroupClassName = '',
    prevActivateId = '',
    nextActivateId = '',
    paginationFractionId = '',
    prevButtonClasses = 'ltr:left-0 rtl:right-0',
    nextButtonClasses = 'ltr:right-0 rtl:left-0',
    buttonSize = 'default',
    paginationVariant = 'default',
    paginationPosition,
    breakpoints,
    loop = true,
    navigation = true,
    pagination = false,
    autoplay = false,
    type = 'circle',
    isFraction = false,
    ...props
}) => {
    const locale = useLocale();

    const dir = getDirection(locale);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const classPagination = paginationPosition ? `pagination-${paginationPosition}` : '';

    const nextButtonClassName = cn(
        'w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform ltr:shadow-navigation ltr:translate-x-1/2 rtl:shadow-navigationReverse rtl:-translate-x-1/2',
        {
            'rounded-full': type === 'circle',
            'lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl':
                buttonSize === 'default',
            '!static': type === 'list',
        },
        nextButtonClasses
    );

    const prevButtonClassName = cn(
        'w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform ltr:shadow-navigation ltr:-translate-x-1/2 rtl:shadow-navigationReverse rtl:translate-x-1/2',
        {
            'rounded-full': type === 'circle',
            'lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl':
                buttonSize === 'default',
            '!static': type === 'list',
        },
        prevButtonClasses
    );

    return (
        <div
            className={`carouselWrapper relative ${className} ${classPagination} ${
                paginationVariant === 'circle' ? 'dotsCircle' : ''
            } ${type === 'list' ? '!static' : ''}`}
        >
            <Swiper
                modules={[Navigation, Autoplay, Pagination, Scrollbar]}
                loop={loop}
                slidesPerView="auto"
                autoplay={autoplay}
                breakpoints={breakpoints}
                pagination={pagination}
                dir={dir}
                key={dir}
                navigation={
                    navigation
                        ? {
                              prevEl: prevActivateId.length ? `#${prevActivateId}` : prevRef.current!, // Assert non-null
                              nextEl: nextActivateId.length ? `#${nextActivateId}` : nextRef.current!, // Assert non-null
                          }
                        : {}
                }
                {...props}
            >
                {children}
            </Swiper>
            {(Boolean(navigation) || Boolean(isFraction)) && (
                <div
                    className={cn(`absolute top-2/4 z-10 flex w-full items-center ${buttonGroupClassName}`, {
                        '': type === 'list',
                    })}
                >
                    {prevActivateId.length > 0 ? (
                        <button className={prevButtonClassName} id={prevActivateId} aria-label="prev-button">
                            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
                        </button>
                    ) : (
                        <button ref={prevRef} className={prevButtonClassName} aria-label="prev-button">
                            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
                        </button>
                    )}

                    {Boolean(isFraction) && (
                        <div className="!w-[auto] text-center text-xs sm:text-base" id={paginationFractionId} />
                    )}

                    {nextActivateId.length > 0 ? (
                        <button className={nextButtonClassName} id={nextActivateId} aria-label="next-button">
                            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </button>
                    ) : (
                        <button ref={nextRef} className={nextButtonClassName} aria-label="next-button">
                            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CarouselTemplate;
