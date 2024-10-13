'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import cn from 'classnames';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';

const instagramFeed = [
    {
        id: 1,
        title: 'text-man',
        slug: '/#',
        image: '/assets/images/instagram/1.jpg',
    },
    {
        id: 2,
        title: 'text-woman',
        slug: '/#',
        image: '/assets/images/instagram/2.jpg',
    },
    {
        id: 3,
        title: 'text-watch',
        slug: '/#',
        image: '/assets/images/instagram/3.jpg',
    },
    {
        id: 4,
        title: 'text-man',
        slug: '/#',
        image: '/assets/images/instagram/4.jpg',
    },
    {
        id: 5,
        title: 'text-sports',
        slug: '/#',
        image: '/assets/images/instagram/5.jpg',
    },
    {
        id: 6,
        title: 'text-fashion',
        slug: '/#',
        image: '/assets/images/instagram/6.jpg',
    },
];

interface Props {
    className?: string;
    variant?: 'rounded';
    disableContainerBorderRadius?: boolean;
}
const Instagram: React.FC<Props> = ({ className = '', variant, disableContainerBorderRadius = false }) => {
    const t = useTranslationsCommon();

    return (
        <div
            className={cn(
                'grid grid-cols-3 gap-0.5 overflow-hidden sm:gap-1 md:grid-cols-6',
                {
                    'rounded-md': !disableContainerBorderRadius,
                },
                className
            )}
        >
            {instagramFeed?.map((item) => (
                <div
                    className="group relative flex justify-center text-center"
                    href={item.slug}
                    key={`instagram--key${item.id}`}
                    target="_blank"
                >
                    <Image
                        src={item.image ?? '/assets/placeholder/instagram.svg'}
                        alt={t(`${item.title}`) || t('text-instagram-thumbnail')}
                        width={300}
                        height={300}
                        className={cn('bg-gray-300 object-cover', {
                            'rounded-md': variant === 'rounded',
                        })}
                    />
                    <div
                        className={cn(
                            'top left absolute h-full w-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50',
                            {
                                'rounded-md': variant === 'rounded',
                            }
                        )}
                    />
                    <div className="top left absolute flex h-full w-full items-center justify-center">
                        <FaInstagram className="scale-400 transform text-base text-white opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Instagram;
