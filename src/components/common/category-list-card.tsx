'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { Category } from '@framework/types';
import { TEMPLATE_ROUTES } from '@utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
    category: Category;
}

const CategoryListCard: React.FC<Props> = ({ category }) => {
    const { name, image, productCount } = category;
    const t = useTranslationsCommon();

    return (
        <Link
            href={`${TEMPLATE_ROUTES.CATEGORY}/${category.slug}`}
            className="flex items-center justify-between rounded-md bg-gray-200 px-5 py-3 transition hover:bg-gray-100 xl:py-3.5 2xl:px-3.5 2xl:py-2.5 3xl:py-3.5"
        >
            <div className="flex items-center">
                <div className="inline-flex flex-shrink-0 2xl:h-12 2xl:w-12 3xl:h-auto 3xl:w-auto">
                    <Image
                        src={image?.original ?? '/assets/placeholder/category-small.svg'}
                        alt={name || t('text-category-thumbnail')}
                        width={60}
                        height={60}
                        className="rounded-full bg-gray-300 object-cover"
                    />
                </div>
                <h3 className="text-sm capitalize text-heading ltr:pl-2.5 rtl:pr-2.5 md:text-base ltr:md:pl-4 rtl:md:pr-4 2xl:text-sm ltr:2xl:pl-3 rtl:2xl:pr-3 3xl:text-base ltr:3xl:pl-4 rtl:3xl:pr-4 ">
                    {name}
                </h3>
            </div>
            <div className="flex items-center">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-gray-350 text-xs font-medium ltr:2xl:mr-2 rtl:2xl:ml-2">
                    {productCount}
                </div>
                <IoIosArrowForward className="hidden text-sm text-heading 2xl:block" />
            </div>
        </Link>
    );
};

export default CategoryListCard;
