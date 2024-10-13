import {
    CountryCode,
    CountryName,
    countryCodeToNameMap,
    countryNameToCodeMapDE,
    countryNameToCodeMapEN,
} from '@/const/country';

export function getCountryCodeByName(countryName: CountryName | undefined): CountryCode | undefined {
    if (!countryName) {
        return undefined;
    }

    return countryNameToCodeMapEN[countryName] || countryNameToCodeMapDE[countryName];
}

export function getCountryNameByCode(countryCode: string): CountryName | undefined {
    if (Object.values(CountryCode).includes(countryCode as any)) {
        return countryCodeToNameMap[countryCode as CountryCode];
    }

    return undefined;
}

export function isGermanyOrAustria(countryCode: CountryCode | undefined): boolean {
    return countryCode === CountryCode.Germany || countryCode === CountryCode.Austria;
}

export function formatCountryNameToEnglish(countryName: CountryName) {
    const countryCode = getCountryCodeByName(countryName);

    if (!countryCode) {
        return '';
    }

    return countryCodeToNameMap[countryCode];
}
