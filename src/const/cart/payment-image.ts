import { PaymentOptions } from '../payment/payment-option';

// TODO: 之後放到 payment 資料夾
export enum PaymentImages {
    VorkasseUberweisung = 'images/icons/vorkasse-payment.png',
    SelfPick = 'images/icons/self-pickup-100.png',
    Paypal = 'images/icons/paypal.svg',
    ConsorsFinanz = 'images/icons/consors-finanz-payment.png',
    GooglePay = 'images/icons/google-pay.svg',
    ApplePay = 'images/icons/apple-pay.svg',
    Stripe = 'images/icons/credit-card-100.png',
    AmazonPay = 'images/icons/amazon-payment.png',
    MasterCard = 'images/icons/master-payment.png',
    Visa = 'images/icons/visa-payment.png',
    AmericanExpress = 'images/icons/americanexpress-payment.png',
}

export enum PaymentReturnType {
    RedirectUrl = 0,
    AutoSubmitForm = 1,
    OrderId = 2,
    ClientSecret = 3,
}

export const CARTS_PAYMENT_IMAGES = [
    {
        id: 1,
        name: 'MasterCard',
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.MasterCard,
        width: 58,
        height: 18,
    },
    {
        id: 2,
        name: 'Visa',
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.Visa,
        width: 58,
        height: 18,
    },
    {
        id: 3,
        name: 'AmericanExpress',
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.AmericanExpress,
        width: 58,
        height: 18,
    },
    {
        id: 4,
        name: 'Paypal',
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.Paypal,
        width: 58,
        height: 18,
    },
    {
        id: 5,
        name: PaymentOptions[PaymentOptions.ConsorsFinanz],
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.ConsorsFinanz,
        width: 30,
        height: 30,
    },
    {
        id: 6,
        name: PaymentOptions[PaymentOptions.VorkasseUberweisung],
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.VorkasseUberweisung,
        width: 100,
        height: 30,
    },
    {
        id: 7,
        name: PaymentOptions[PaymentOptions.AmazonPay],
        imageUrl: process.env.NEXT_PUBLIC_CDN_ASSETS_URL + PaymentImages.AmazonPay,
        width: 58,
        height: 18,
    },
];
