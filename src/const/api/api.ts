const API = process.env.NEXT_PUBLIC_API as string;

export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Patch = 'PATCH',
}

// for client component
export function getProxiedEndpoint(endpoint: string): string {
    const basePath = API;
    const proxiedBasePath = '/api/proxy';

    return endpoint.replace(basePath, proxiedBasePath);
}

// for server component fetch
export const ApiEndpoints = {};

export enum ApiReturnCode {
    // 成功 > 2xxxx
    Success = 20000,

    // 輸入參數相關
    InvalidParameter = 30001,
    TimeRangeIncorrect = 30004, // "時間段格式不正確"
    ZipCodeIncorrect = 30005, // "郵遞區號格式不正確"
    StockNotEnough = 30006, // "庫存不足"
    OutOfStock = 30007, // "無庫存"

    // 登入相關 400xx
    InvalidAccessToken = 40001,
    AlreadyLoginInOtherPlace = 40002,
    AccessTokenExpired = 40003,
    UserNotExist = 40004,
    UsernameOrPasswordIsIncorrect = 40005,
    TurnstileFail = 40006,
    AccountNotActivated = 40007,
    VerificationCodeFail = 40008, // 重設密碼驗證碼錯誤
    CustNoAlreadyUsed = 41009,
    // 註冊相關 401xx
    UsernameIsRepeat = 40101,
    AccountActivationFail = 40102,

    // 購物車相關 41xxx
    CountryGroupNotAllowed = 41001, // 國家不允許
    CountryNotAllowed = 41002,
    GeneralPaymentFail = 41003,
    ShippingMethodNotExisted = 41004,
    ShippingMethodsCountryNotAllow = 41005,
    CustNoEmpty = 41006,
    PreCheckSkusStockFail = 41007,
    PreCheckModelStockFail = 41008,
    QuantityLessThan1 = 41010,
    // 支付相關 42xxx
    PaymentCodeNotExisted = 42001,
    PaymentMethodsCountryNotAllow = 42002,
    PaymentIsDsiable = 42003,

    // 結帳相關 43xxx
    TempOrderVaildError = 43001,
    OrderVaildError = 43002,
    GetFinalAmountFail = 43003,
    ModelVaildError = 43004,

    // 一般
    Authorize = 40100,
    Forbidden = 40300,
    TooManyRequests = 44101,

    // 伺服器錯誤 5xxxx
    InternalError = 50000,
    ThirdPartyFail = 50001,

    // 資料庫 6xxxx
    GeneralDBError = 60000,
    DuplicateKeyEntry = 60001,
    NotExist = 60002,
    NotAllowed = 60003,

    // 通用
    GeneralError = 99999,
}
