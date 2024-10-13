/**
 * Should not put server-side-log and client-side-log in the same file.
 * Doing so can increase the front-end bundle size unnecessarily.
 */

import { LogLevel, getLogProperties } from './const-logging';

// Server side log ( Next js )
export const serverSideLog = (message: string, level = LogLevel.Information, param: any = {}) => {
    if (!message) {
        return;
    }

    const winston = require('winston');
    const { SeqTransport } = require('@datalust/winston-seq');

    const logger = winston.createLogger({
        transports: [
            new SeqTransport({
                serverUrl: process.env.NEXT_PUBLIC_SEQ_SERVER_URL,
                apiKey: process.env.NEXT_PUBLIC_SEQ_SERVER_API_KEY,
                onError: (e: any) => {
                    console.error(e);
                },
            }),
        ],
    });

    const properties = getLogProperties('NextJS-Backend', message, level, param);

    switch (level) {
        case LogLevel.Information:
            logger.info(message, properties);
            break;
        case LogLevel.Debug:
            logger.debug(message, properties);
            break;
        case LogLevel.Warning:
            logger.warn(message, properties);
            break;
        case LogLevel.Error:
        case LogLevel.Fatal: // no Fatal
            logger.error(message, properties);
            break;
        default:
            logger.info(message, properties);
    }

    logger.close();
};
