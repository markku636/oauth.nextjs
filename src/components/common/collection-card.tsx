'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Link from '@components/ui/link';
import Text from '@components/ui/text';
import cn from 'classnames';
import Image from 'next/image';

interface Props {
    imgWidth?: number | string;
    imgHeight?: number | string;
    contactClassName?: string;
    variant?: 'default' | 'modern' | 'trendy';
    collection: {
        slug: string;
        image: string;
        title: string;
        description?: string;
    };
}

const CollectionCard: React.FC<Props> = ({
    collection,
    imgWidth = 580,
    imgHeight = 580,
    contactClassName = '',
    variant = 'default',
}) => {
    const { slug, image, title, description } = collection;
    const t = useTranslationsCommon();

    return (
        <Link
            href={slug}
            className={cn(
                'group flex flex-col overflow-hidden rounded-md border border-gray-300 pb-4 text-center sm:border-0 sm:pb-0 sm:last:hidden lg:last:flex',
                {
                    'justify-between sm:even:flex-col-reverse': variant === 'default',
                    '!pb-0': variant === 'trendy',
                }
            )}
        >
            <div className="relative mx-auto flex flex-col">
                <div className="flex">
                    <Image
                        src={image ?? '/assets/placeholder/collection.svg'}
                        alt={t('title') || t('text-card-thumbnail')}
                        width={imgWidth}
                        height={imgHeight}
                        className="bg-gray-300 object-cover transition duration-200 ease-in-out group-hover:opacity-90 sm:rounded-md"
                    />
                </div>
                <div
                    className={cn(
                        'absolute bottom-3.5 overflow-hidden p-2 ltr:right-3.5 rtl:left-3.5 lg:bottom-5 ltr:lg:right-5 rtl:lg:left-5',
                        {
                            '!bottom-[-12px] !right-[-12px]': variant === 'trendy',
                        }
                    )}
                >
                    <span
                        className={cn(
                            'inline-block transform cursor-pointer rounded-md bg-white px-4 py-3 text-center text-[13px] font-semibold leading-4 text-heading shadow-navigation transition duration-300 ease-in-out hover:bg-heading hover:text-white md:text-sm lg:translate-y-full lg:px-6 lg:py-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100',
                            {
                                'bg-heading text-[#fff] hover:bg-white hover:text-heading lg:px-12 lg:py-6':
                                    variant === 'trendy',
                            }
                        )}
                    >
                        {t('button-view-collection')}
                    </span>
                </div>
            </div>

            {variant !== 'trendy' && (
                <div className={contactClassName}>
                    <Text variant="mediumHeading" className="mb-1.5 lg:mb-2.5 2xl:mb-3 3xl:mb-3.5">
                        {t(`${title}`)}
                    </Text>
                    <p className="text-[13px] leading-6 text-body md:text-sm md:leading-7 xl:px-10 3xl:px-20">
                        {t(`${description}`)}
                    </p>
                </div>
            )}
        </Link>
    );
};

export default CollectionCard;
