import { ApiResponse } from '@/typing/common';

export interface LoginGuestParams {
    turnstileToken: string;
}

export interface LoginParams {
    email: string;
    password: string;
    turnstileToken: string;
}

export interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobilePhone?: string;
    turnstileToken: string;
}

export interface VerifyRestCodeParams {
    email: string;
    verificationCode: string;
}

export interface RequestPasswordResetParams {
    email: string;
    turnstileToken: string;
}

export interface ResetPasswordParams {
    email: string;
    password: string;
    confirmPassword: string;
    verificationCode: string;
}

export interface ChangeAccountInfoParams {
    // for billing field
    firstName: string;
    lastName: string;
    companyName: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    country: string;
    contactNum: string;
    // for shipping field
    sFirstName: string;
    sLastName: string;
    sCompanyName: string;
    sAddress1: string;
    sAddress2: string;
    sCity: string;
    sZipCode: string;
    sCountry: string;
    sContactNum: string;
    birthday: Date | null;
}

export interface ActivateAccountParams {
    activationCode: string;
}

export type UserQueryResponse = ApiResponse<UserProfile>;
export type LoginMutationResponse = ApiResponse<{ profile: UserProfile; jwtToken: string }>;
export type RegisterMutationResponse = ApiResponse<{
    memID: string;
    email: string;
    firstName: string;
    lastName: string;
}>;

export interface UserProfile {
    memID: number;
    mail: string;
    firstName: string | null;
    lastName: string | null;
    companyName: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: number;
    zipCode: string | null;
    contactNum: string | null;
    mobileNum: string | null;
    isUS: boolean;
    sFirstName: string | null;
    sLastName: string | null;
    sCompanyName: string | null;
    sAddress1: string | null;
    sAddress2: string | null;
    sCity: string | null;
    sState: number;
    sZipCode: string | null;
    sContactNum: string | null;
    sIsUS: boolean;
    birthday: string; // Consider using `Date` for actual Date operations.
    sMobileNum: string | null;
    updateDriPass: boolean;
    country: string | null;
    sCountry: string | null;
    point: number;
    code: string | null;
    verify: boolean;
    activated: boolean;
}
