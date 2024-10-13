'use client';
import Link from '@components/ui/link';
import usePrice from '@framework/product/use-price';
import { TEMPLATE_ROUTES } from '@utils/routes';
import Image from 'next/image';

type SearchProductProps = {
    item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
    const { price, basePrice } = usePrice({
        amount: item.sale_price ? item.sale_price : item.price,
        baseAmount: item.price,
        currencyCode: 'USD',
    });

    return (
        <Link
            href={`${TEMPLATE_ROUTES.PRODUCT}/${item?.slug}`}
            className="group flex h-auto w-full items-center justify-start"
        >
            <div className="relative flex h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-gray-200 ltr:mr-4 rtl:ml-4">
                <Image
                    src={item?.image?.original ?? '/assets/placeholder/search-product.svg'}
                    width={96}
                    height={96}
                    loading="eager"
                    alt={item.name || 'Product Image'}
                    className="bg-gray-200 object-cover"
                />
            </div>
            <div className="flex w-full flex-col overflow-hidden">
                <h3 className="mb-2 truncate text-sm text-heading">{item.name}</h3>
                <div className="text-sm font-semibold text-heading">
                    {price}
                    <del className="font-normal text-gray-400 ltr:pr-2 rtl:pl-2">{basePrice}</del>
                </div>
            </div>
        </Link>
    );
};

export default SearchProduct;
