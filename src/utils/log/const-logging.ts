// https://docs.datalust.co/v4.2/docs/logging-levels
export enum LogLevel {
    Debug = 'Debug',
    Information = 'Information',
    Warning = 'Warning',
    Error = 'Error',
    Fatal = 'Fatal',
}

export enum LogEnvironment {
    DEV = 'DEV',
    PROD = 'PROD',
}

const COUNTRY = 'DE';

export const getLogProperties = (souce: string, message: string, level = LogLevel.Information, param: any = {}) => {
    const properties: any = {
        ...{
            Source: souce,
            Environment: process.env.NODE_ENV === 'development' ? LogEnvironment.DEV : LogEnvironment.PROD,
            Message: message,
            Country: COUNTRY,
        },
        ...param,
    }; // 保留程式彈性，所以用 any

    return properties;
};
