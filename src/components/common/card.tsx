'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Link from '@components/ui/link';
import Text from '@components/ui/text';
import Image from 'next/image';
import { LinkProps } from 'next/link';
import { FaLink } from 'react-icons/fa';

interface Props {
    item: any;
    variant?: 'rounded' | 'circle';
    size?: 'small' | 'medium';
    imgSize?: 'large';
    effectActive?: boolean;
    href: LinkProps['href'];
    showName?: boolean;
    disableBorderRadius?: boolean;
}

const Card: React.FC<Props> = ({
    item,
    variant = 'circle',
    size = 'small',
    effectActive = false,
    href,
    showName = true,
    imgSize,
    disableBorderRadius = false,
}) => {
    const { name, image } = item ?? {};
    const imageSize: any = (imgSize === 'large' && 375) || (size === 'small' && 180) || (size === 'medium' && 198);

    const placeholderImage = `/assets/placeholder/card-${size}.svg`;
    const t = useTranslationsCommon();

    return (
        <Link href={href} className="group flex flex-col justify-center text-center">
            {/* disableBorderRadius===false && (variant === 'rounded' ? 'rounded-md' : 'rounded-full') */}
            <div
                className={`relative mx-auto mb-3.5 inline-flex md:mb-4 lg:mb-5 xl:mb-6 ${
                    !disableBorderRadius && (variant === 'rounded' ? 'rounded-md' : 'rounded-full')
                }`}
            >
                <div className="flex">
                    <Image
                        src={image?.original ?? placeholderImage}
                        alt={name || t('text-card-thumbnail')}
                        width={imageSize}
                        height={imageSize}
                        quality={100}
                        className={`bg-gray-300 object-cover ${
                            !disableBorderRadius && (variant === 'rounded' ? 'rounded-md' : 'rounded-full')
                        }`}
                    />
                </div>
                {effectActive === true && (
                    <>
                        <div
                            className={`top left absolute h-full w-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
                                !disableBorderRadius && (variant === 'rounded' ? 'rounded-md' : 'rounded-full')
                            }`}
                        />
                        <div className="top left absolute flex h-full w-full items-center justify-center">
                            <FaLink className="scale-0 transform text-base text-white opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:text-xl lg:text-2xl xl:text-3xl" />
                        </div>
                    </>
                )}
            </div>
            {!!showName !== false && (
                <Text variant="heading" className="capitalize">
                    {name}
                </Text>
            )}
        </Link>
    );
};

export default Card;
