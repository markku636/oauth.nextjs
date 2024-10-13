export const CookieKeys = {
    TurnstileBypassToken: 'TurnstileBypassToken',
    CartID: 'CartID',
    CustOrderID: 'CustOrderID',
    AcceptCookies: 'AcceptCookies',
};

export const CloudflareTurnstileNames = {
    login: { action: 'login', containerId: 'cloudflare-login' },
    register: { action: 'register', containerId: 'cloudflare-register' },
    forgotPassword: { action: 'forgot-password', containerId: 'cloudflare-forgot-password' },
    changePassword: { action: 'change-password', containerId: 'cloudflare-change-password' },
};

export enum LocalStorageKeys {
    AccessToken = 'AccessToken',
    ShippingAddress = 'ShippingAddress',
    BackendFinalAmount = 'BackendFinalAmount',
    OrderConfirmParams = 'OrderConfirmParams',
}

export enum SessionStorageKeys {
    OrderData = 'OrderData',
}
