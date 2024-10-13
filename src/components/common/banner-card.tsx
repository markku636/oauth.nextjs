'use client';
import { useWindowSize } from '@/hooks/use-window-size';
import Link from '@components/ui/link';
import cn from 'classnames';
import Image from 'next/image';
import { LinkProps } from 'next/link';

interface BannerProps {
    banner: any;
    variant?: 'rounded' | 'default';
    effectActive?: boolean;
    className?: string;
    classNameInner?: string;
    href: LinkProps['href'];
    disableBorderRadius?: boolean;
}

function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function BannerCard({
    banner,
    className,
    variant = 'rounded',
    effectActive = false,
    classNameInner,
    href,
    disableBorderRadius = false,
}: BannerProps) {
    const { width } = useWindowSize();
    const { title, image } = banner;
    const selectedImage = getImage(width, image);

    return (
        <div className={cn('mx-auto', className)}>
            <Link
                href={href}
                className={cn('group relative flex h-full justify-center overflow-hidden', classNameInner)}
            >
                <Image
                    src={selectedImage.url}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    alt={title}
                    quality={100}
                    className={cn('w-full bg-gray-300 object-cover', {
                        'rounded-md': variant === 'rounded' && !disableBorderRadius,
                    })}
                />
                {effectActive && (
                    <div className="z-5 absolute top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine ltr:-left-[100%]" />
                )}
            </Link>
        </div>
    );
}
