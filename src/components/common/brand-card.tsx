'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { Brand } from '@framework/types';
import { TEMPLATE_ROUTES } from '@utils/routes';
import Image from 'next/image';
import Link from 'next/link';

const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => {
    const { slug, name, background_image, image } = brand;
    const t = useTranslationsCommon();

    return (
        <Link
            href={{
                pathname: TEMPLATE_ROUTES.SEARCH,
                query: { brand: slug },
            }}
        >
            <div className="group relative flex justify-center overflow-hidden rounded-md text-center">
                <Image
                    src={background_image?.original ?? '/assets/placeholder/brand-bg.svg'}
                    alt={name || t('text-brand-thumbnail')}
                    width={428}
                    height={428}
                    className="transform rounded-md object-cover transition-transform duration-500 ease-in-out group-hover:rotate-6 group-hover:scale-125"
                />
                <div className="top left absolute h-full w-full bg-black opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="top left absolute flex h-full w-full items-center justify-center p-8">
                    <img src={image?.original} alt={name || t('text-brand-thumbnail')} className="flex-shrink-0" />
                </div>
            </div>
        </Link>
    );
};

export default BrandCard;
