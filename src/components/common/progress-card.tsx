'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';

interface Props {
    soldProduct?: number;
    totalProduct?: number;
}

const ProgressCard: React.FC<Props> = ({ soldProduct = 0, totalProduct = 0 }) => {
    const progressBar = (100 / totalProduct) * soldProduct;
    const t = useTranslationsCommon();

    return (
        <div>
            <div className="mb-2.5 flex items-center justify-between md:mb-3 xl:mb-2.5 2xl:mb-4">
                <div className="text-xs leading-6 text-body md:text-sm md:leading-7">
                    {t('text-sold')} :&nbsp;
                    <span className="text-heading">{soldProduct}</span>
                </div>
                <div className="text-xs leading-6 text-body md:text-sm md:leading-7">
                    {t('text-available')} :&nbsp;
                    <span className="text-heading">{totalProduct - soldProduct}</span>
                </div>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 lg:h-3 2xl:h-4">
                <div className="absolute h-full bg-heading" style={{ width: `${Math.round(progressBar)}%` }} />
            </div>
        </div>
    );
};

export default ProgressCard;
