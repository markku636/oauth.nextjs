'use clinet';
import { ShippingMethodType } from '@/const/cart/shipping-method-type';
import { CountryCode, CountryGroupCode } from '@/const/country';
import { useGetShippingMethodsQuery } from '@/redux/api/cart-api-slice';
import { IShippingMethodResp } from '@/typing/api/cart-api-type';
import { useTranslations } from 'next-intl';
import useShippingAddressCountry from './use-shipping-address-country';

const shippingMethodsKeyMap: Record<ShippingMethodType, string> = {
    [ShippingMethodType.DPD]: 'shipping-method-dpd-description',
    [ShippingMethodType.DHL]: 'shipping-method-dhl-description',
    [ShippingMethodType.SELFPICK]: 'shipping-method-self-pickup-description',
};

const shippingMethodsImageMap: Record<ShippingMethodType, string> = {
    [ShippingMethodType.DPD]: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/icons/shipping-dpd.png',
    [ShippingMethodType.DHL]: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/icons/shipping-dhl.png',
    [ShippingMethodType.SELFPICK]: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + 'images/icons/shipping-pickup.png',
};

export default function useShippingMethodOptions() {
    const t = useTranslations('carts-page');

    const { countryCode, countryGroupCode } = useShippingAddressCountry();
    const { data: shippingMethods = [], isLoading } = useGetShippingMethodsQuery({
        countryCode: countryCode as CountryCode,
        shippingToCountryGroupCode: countryGroupCode as CountryGroupCode,
    });

    const transformShippingMethodResponse = (option: IShippingMethodResp) => {
        const { shippingMethodType } = option;

        return {
            ...option,
            imageUrl: shippingMethodsImageMap[shippingMethodType],
            description: t(shippingMethodsKeyMap[shippingMethodType] as any),
        };
    };

    const transformData = shippingMethods.map(transformShippingMethodResponse);

    return {
        data: transformData,
        isLoading,
    };
}
