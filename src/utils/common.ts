export const isClientSide = (): boolean => {
    return typeof window !== 'undefined';
};

export const getHostIP = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ip = require('ip');

    return ip.address();
};
