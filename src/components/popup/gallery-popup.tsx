'use client';
import { useSelectUI } from '@/redux/features/ui/ui-slice';
import styles from '@/styles/product/swiper-gallery-popup-pagination.module.scss';
import Style from '@/styles/product/swiper-gallery-popup.module.scss';
import cn from '@utils/classname/cn';
import Image from 'next/image';
import { FreeMode, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IGalleryPopupPopupData {
    bigImageList: string[];
    smallImageList: string[];
    selectedImageIndex: number;
}

export default function GalleryPopup() {
    const {
        popupModalData: { modalData },
    } = useSelectUI();
    const data = modalData.data as IGalleryPopupPopupData;

    return (
        <div className="overflow-hidden mx-auto">
            <div className={cn(Style.swiper_gallery_popup_arrows_wrapper)}>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
            <div className={cn(Style.swiper_container, 'mx-auto max-w-[700px] lg:max-w-[800px]')}>
                <Swiper
                    className={styles.swiper}
                    slidesPerView={1}
                    initialSlide={data.selectedImageIndex}
                    pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return (
                                '<span class="' +
                                className +
                                `"><img class="pagination-bullet-img"  src="${data.smallImageList[index]}"/></span>`
                            );
                        },
                    }}
                    modules={[Pagination, Navigation, FreeMode]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    {data.bigImageList.map((src, index) => (
                        <SwiperSlide key={`${src}_${index}`}>
                            <div className="relative h-[700px] lg:h-[850px] max-w-[700px] lg:max-w-[800px]">
                                <Image
                                    fill={true}
                                    src={src}
                                    style={{ objectFit: 'contain', transform: 'scale(0.70)' }}
                                    className="mx-auto"
                                    alt="product image"
                                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 80vw, 70vw"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
