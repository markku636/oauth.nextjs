'use client';
import { PaymentImages } from '@/const/cart/payment-image';
import { ShippingMethodType } from '@/const/cart/shipping-method-type';
import { PaymentOptions } from '@/const/payment/payment-option';
import { useGetCartGlobalVariablesQuery } from '@/redux/api/cart-api-slice';
import { useSelectShippingMethod } from '@/redux/features/cart/cart-slice';
import { IPayment, PaymentCode } from '@/typing/api/cart-api-type';
import { IPaymentOption } from '@components/cart/shopping-cart/payment-step/payment-section';
import { formatNumberToCurrency } from '@utils/format';
import { getAllInstallmentInfo } from '@utils/product/consors-finanz';
import { useTranslations } from 'next-intl';
import useCartCalculations from './use-cart-caculations';
import useShippingAddressCountry from './use-shipping-address-country';

export const paymentOptionImageMap: Record<string, { url: string; width: number; height: number }> = {
    VorkasseUberweisung: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.VorkasseUberweisung,
        width: 120,
        height: 60,
    },
    Paypal: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.Paypal,
        width: 120,
        height: 60,
    },
    ConsorsFinanz: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.ConsorsFinanz,
        width: 120,
        height: 60,
    },
    Stripe: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.Stripe,
        width: 40,
        height: 40,
    },
    SelfPick: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.SelfPick,
        width: 40,
        height: 40,
    },
    GooglePay: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.GooglePay,
        width: 70,
        height: 70,
    },
    ApplePay: {
        url: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.ApplePay,
        width: 70,
        height: 70,
    },
};

const paymentTextLangMap: Partial<Record<PaymentCode, string>> = {
    VorkasseUberweisung: 'payment-option-vorkasse',
    SelfPick: 'payment-option-self-pick',
    Paypal: 'payment-option-paypal',
    ConsorsFinanz: 'payment-option-consors-finanz',
    Stripe: 'payment-option-credit-card',
    ApplePay: 'payment-option-apple-pay',
    GooglePay: 'payment-option-google-pay',
};

export default function usePaymentOptions() {
    const t = useTranslations('common');

    const { shippingMethodType } = useSelectShippingMethod();
    const { data: cartGV, isLoading } = useGetCartGlobalVariablesQuery();
    const { countryCode } = useShippingAddressCountry();
    const { data: calculations } = useCartCalculations();

    const rawPaymentOptions = cartGV?.availablePayments ?? [];

    const isPaymentAmazonPay = (paymentCode: string) => paymentCode === PaymentOptions[PaymentOptions.AmazonPay];
    const isPaymentSelfPick = (paymentCode: string) => paymentCode === PaymentOptions[PaymentOptions.SelfPick];
    const isCountryAllowed = (countryCode: string | undefined, allowedCountries: string) => {
        if (!countryCode) {
            return false;
        }
        return allowedCountries === 'ALL' || allowedCountries.includes(countryCode);
    };

    const isPaymentAllowed = (
        payment: IPayment,
        countryCode: string | undefined,
        shippingMethodType: ShippingMethodType
    ): boolean => {
        const { paymentCode, allowCountries } = payment;

        if (shippingMethodType === ShippingMethodType.SELFPICK) {
            return !isPaymentAmazonPay(paymentCode) && isCountryAllowed(countryCode, allowCountries);
        }

        return (
            !isPaymentAmazonPay(paymentCode) &&
            !isPaymentSelfPick(paymentCode) &&
            isCountryAllowed(countryCode, allowCountries)
        );
    };

    const transformPaymentOption = (payment: IPayment): IPaymentOption => {
        const paymentCode = payment.paymentCode;

        const installmentInfo = getAllInstallmentInfo(calculations.total).find((info) => info.installments === 6);

        let paymentText = '';

        if (paymentCode === PaymentOptions[PaymentOptions.ConsorsFinanz]) {
            paymentText = t(paymentTextLangMap[paymentCode] as any, {
                month: installmentInfo?.installments,
                monthlyPayment: formatNumberToCurrency(installmentInfo?.monthlyPayment as number),
            });
        } else {
            paymentText = t(paymentTextLangMap[paymentCode] as any);
        }

        return {
            ...payment,
            imageProp: paymentOptionImageMap[paymentCode],
            text: paymentText,
        };
    };

    const filterValidPaymentOptions = (
        payments: IPayment[],
        countryCode: string | undefined,
        shippingMethodType: ShippingMethodType
    ): IPaymentOption[] => {
        return payments
            .filter((payment) => isPaymentAllowed(payment, countryCode, shippingMethodType))
            .map(transformPaymentOption);
    };

    const paymentOptions = filterValidPaymentOptions(rawPaymentOptions, countryCode, shippingMethodType);

    return {
        data: paymentOptions,
        isLoading,
    };
}
