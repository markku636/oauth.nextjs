import { UserProfile } from '@/typing/api/auth-api-type';

export function createGeneralAddress(type: 'shipping' | 'billing', addressData: any) {
    return {
        email: addressData.email,
        country: type === 'shipping' ? addressData.sCountry : addressData.country, // full country name: e.g:"Germany"
        firstName: type === 'shipping' ? addressData.sFirstName : addressData.firstName,
        lastName: type === 'shipping' ? addressData.sLastName : addressData.lastName,
        line1: type === 'shipping' ? addressData.sAddress1 : addressData.address1,
        line2: type === 'shipping' ? addressData.sAddress2 : addressData.address2,
        city: type === 'shipping' ? addressData.sCity : addressData.city,
        companyName: type === 'shipping' ? addressData.sCompanyName : addressData.companyName,
        postalCode: type === 'shipping' ? addressData.sZipCode : addressData.zipCode,
        phone: type === 'shipping' ? addressData.sContactNum : addressData.contactNum,
        phoneCountryCode: '', // 需等後端新增欄位和調整 MemberInfo，目前沒有存國碼和手機國家代碼
        stateProvinceCode: '-', // 目前沒用到，但後端要求必填
    };
}

export function prepareAddressValues(memberInfo: UserProfile) {
    const billingAddressValues = {
        email: memberInfo.mail ?? '',
        firstName: memberInfo.firstName ?? '',
        lastName: memberInfo.lastName ?? '',
        companyName: memberInfo.companyName ?? '',
        address1: memberInfo.address1 ?? '',
        address2: memberInfo.address2 ?? '',
        city: memberInfo.city ?? '',
        zipCode: memberInfo.zipCode ?? '',
        country: memberInfo.country ?? '',
        contactNum: memberInfo.contactNum ?? '',
    };

    const shippingAddressValues = {
        email: memberInfo.mail ?? '',
        firstName: memberInfo.sFirstName ?? '',
        lastName: memberInfo.sLastName ?? '',
        companyName: memberInfo.sCompanyName ?? '',
        address1: memberInfo.sAddress1 ?? '',
        address2: memberInfo.sAddress2 ?? '',
        city: memberInfo.sCity ?? '',
        zipCode: memberInfo.sZipCode ?? '',
        country: memberInfo.sCountry ?? '',
        contactNum: memberInfo.sContactNum ?? '',
    };

    return { billingAddressValues, shippingAddressValues };
}
