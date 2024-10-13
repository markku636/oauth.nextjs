'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Text from '@components/ui/text';
import { Category } from '@framework/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
    const { name, products } = category;
    const t = useTranslationsCommon();
    return (
        <div className="flex flex-col rounded-lg border border-gray-300 p-4 lg:p-5 xl:p-7">
            <Text variant="heading" className="-mt-0.5 mb-2.5 capitalize lg:-mt-1 lg:mb-3.5 xl:-mt-0">
                {name}
            </Text>
            <div className="grid grid-cols-3 gap-2.5 xl:gap-3">
                {products?.slice(0, 3)?.map((product) => (
                    <Link href={`${product?.slug}`} key={`image--key${product?.id}`}>
                        <div className="flex overflow-hidden rounded-md">
                            <Image
                                src={product?.image?.original ?? '/assets/placeholder/products/product-cat.svg'}
                                alt={name || t('text-category-thumbnail')}
                                width={165}
                                height={165}
                                className="transform rounded-md bg-gray-300 object-cover transition duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;
