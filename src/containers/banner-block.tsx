import BannerCard from '@components/common/banner-card';
import { TEMPLATE_ROUTES } from '@utils/routes';

interface BannerProps {
    data: any;
    className?: string;
}

const BannerBlock: React.FC<BannerProps> = ({ data, className = 'mb-12 md:mb-14 xl:mb-16 px-2.5' }) => {
    return (
        <div className={`${className} mx-auto grid max-w-[1920px] grid-cols-2 gap-2 sm:grid-cols-9 md:gap-2.5`}>
            {data.map((banner: any) => (
                <BannerCard
                    key={`banner--key${banner.id}`}
                    banner={banner}
                    href={`${TEMPLATE_ROUTES.COLLECTIONS}/${banner.slug}`}
                    effectActive={true}
                    variant="default"
                    className={banner.type === 'medium' ? 'col-span-full sm:col-span-5' : 'col-span-1 sm:col-span-2'}
                />
            ))}
        </div>
    );
};

export default BannerBlock;
