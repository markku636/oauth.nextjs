'use client';
import { getEstimateShippingDays } from '@utils/product/shipping-day';
import { useTranslations } from 'next-intl';

export function useEstimateShippingText(prebuild: boolean, workingDays: number) {
    const t = useTranslations('product');
    const { minShippingDays, maxShippingDays } = getEstimateShippingDays(prebuild, workingDays);

    return `${t('ready-for-shipping', { minDays: minShippingDays, maxDays: maxShippingDays })} ${t('working-days')}`;
}
