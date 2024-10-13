/* global google */
/* eslint-disable camelcase */
import { Loader } from '@googlemaps/js-api-loader';
import { RefObject } from 'react';

export type AddressData = {
    country: string;
    city: string;
    state: string;
    zipcode: string;
    route: string;
    streetNumber: string;
};

export type AutocompleteOptions = {
    autocompleteRef: any;
    inputElementRef: RefObject<HTMLInputElement>;
    language: 'de' | 'en';
    countryCode: string | undefined;
};

export const initAutocomplete = async (options: AutocompleteOptions) => {
    const { autocompleteRef, inputElementRef, language, countryCode = 'DE' } = options;

    const loader = new Loader({
        apiKey: '', // todo key
        version: 'weekly',
        libraries: ['places'],
        language,
    });

    const placeLibrary = await loader.importLibrary('places');

    if (!autocompleteRef.current && inputElementRef.current) {
        autocompleteRef.current = new placeLibrary.Autocomplete(inputElementRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: countryCode },
            fields: ['address_component'],
        });
    }

    return autocompleteRef.current;
};

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getAddressFieldName = (type: 'shipping' | 'billing', fieldName: string) => {
    return type === 'shipping' ? `s${capitalizeFirstLetter(fieldName)}` : fieldName;
};

export const getAddressData = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
    const defaultAddressData = {
        city: '',
        state: '',
        zipcode: '',
        country: '',
        route: '',
        streetNumber: '',
    };

    return addressComponents.reduce((acc, cur) => {
        const { long_name, types } = cur;
        const type = types[0];

        switch (type) {
            case 'postal_code':
                acc.zipcode = long_name;
                break;
            case 'locality':
                acc.city = long_name;
                break;
            case 'route':
                acc.route = long_name;
                break;
            case 'street_number':
                acc.streetNumber = long_name;
                break;
            case 'country':
                acc.country = long_name;
                break;
            case 'administrative_area_level_1':
                acc.state = long_name;
                break;
            default:
                break;
        }
        return acc;
    }, defaultAddressData as AddressData);
};
