'use client';
import { CountryCode, CountryName } from '@/const/country';
import { useSelectAddressFields } from '@/redux/features/cart/cart-slice';
import { getCountryCodeByName } from '@utils/country';

export default function useShippingAddressCountry() {
    const addressFields = useSelectAddressFields();

    const countryCode = getCountryCodeByName(addressFields.sCountry as CountryName) ?? '';
    const getCountryGroupCode = (code: string) => {
        if (!code) {
            return '';
        }
        return code === CountryCode.Germany || code === CountryCode.Austria ? code : 'EU';
    };

    return {
        country: addressFields.sCountry,
        countryCode,
        countryGroupCode: getCountryGroupCode(countryCode),
    };
}
