import { Logger } from 'seq-logging';
import { LogLevel, getLogProperties } from './const-logging';

// client side log ( Browser Log)
export const clientSideLog = (message: string, level = LogLevel.Information, param: any = {}) => {
    if (!message) {
        return;
    }

    // param.ClientIP = getCookie('cl_ip') || '';
    // param.Url = window.location.pathname;

    const logger = new Logger({
        serverUrl: process.env.NEXT_PUBLIC_SEQ_SERVER_URL,
        apiKey: process.env.NEXT_PUBLIC_SEQ_SERVER_API_KEY,
        onError: (e: any) => {
            console.error(e);
        },
    });

    const properties = getLogProperties('NextJS-Frontend', message, level, param);

    logger.emit({
        timestamp: new Date(),
        level: level || LogLevel.Information,
        messageTemplate: '{Message}',
        properties: properties,
    });

    logger.close();
};
