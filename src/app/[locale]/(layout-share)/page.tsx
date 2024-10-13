import BannerCard from '@components/common/banner-card';
import CustomContainer from '@components/ui/custom-container';
import Divider from '@components/ui/divider';
import BannerSliderBlock from '@containers/banner-slider-block';
import CategoryBlock from '@containers/category-block';
import ProductsFlashSaleBlock from '@containers/product-flash-sale-block';
import { homeThreeBanner as banner } from '@framework/static/banner';

export default function Home() {
    return (
        <>
            <BannerCard
                key={`banner--key${banner[1].id}`}
                banner={banner[1]}
                href={`/${banner[1].slug}`}
                className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
            />
            <CustomContainer>
                <ProductsFlashSaleBlock date={'2024-03-01T01:02:03'} />

                <BannerSliderBlock />
                <BannerCard
                    key={`banner--key${banner[0].id}`}
                    banner={banner[0]}
                    href={`/${banner[0].slug}`}
                    className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
                />
                <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
            </CustomContainer>
            <Divider className="mb-0" />
        </>
    );
}
