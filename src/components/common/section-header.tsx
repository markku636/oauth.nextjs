'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Link from '@components/ui/link';
import Text from '@components/ui/text';

interface Props {
    sectionHeading: string;
    categorySlug?: string;
    className?: string;
    textClassName?: string;
}

const SectionHeader: React.FC<Props> = ({
    sectionHeading = 'text-section-title',
    categorySlug,
    className = 'pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8',
    textClassName = '',
}) => {
    const t = useTranslationsCommon();

    return (
        <div className={`-mt-2 flex items-center justify-between ${className}`}>
            <Text className={textClassName} variant="mediumHeading">
                {t(`${sectionHeading}`)}
            </Text>
            {categorySlug && (
                <Link href={categorySlug} className="mt-0.5 text-xs text-heading lg:mt-1 lg:text-sm xl:text-base">
                    {t('text-see-all-product')}
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
