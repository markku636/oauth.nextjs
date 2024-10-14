import { clientSideLog } from '@utils/log/client-side-log';
import { LogLevel } from '@utils/log/const-logging';
import { createProxyMiddleware } from 'http-proxy-middleware';

// ** The config is for set up Next.js default behavior **
export const config = {
    api: {
        externalResolver: true, // true, means not use the default settings of Next.js
        bodyParser: false, // false, means not use Next.js bodyParser(same as express)
    },
};

const proxy: any = createProxyMiddleware({
    target: process.env.NEXT_PUBLIC_JOKO_OATH_URL,
    changeOrigin: true, // change `request domain` to `target`
    pathRewrite: { '^/api/oauth-proxy': '' }, // remove `/api/proxy` prefix
    onProxyReq: relayRequestHeaders,
    onError: (err: any, req: any) => {
        clientSideLog(
            `[Proxy] Error for ${req.method} '${req.url}' to '${process.env.NEXT_PUBLIC_JOKO_OATH_URL}': ${err.message}`,
            LogLevel.Error
        );
    },
});

// 型別暫時給 any
function proxyServer(req: any, res: any) {
    proxy(req, res, (err: any) => {
        if (err) {
            throw err;
        }

        throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
    });
}

export default proxyServer;

function relayRequestHeaders(proxyReq: any, req: any, res: any) {
    const cookie = req.headers.cookie;

    if (cookie) {
        proxyReq.setHeader('cookie', cookie);
    }
}
