// server side componet
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    const messages = await import(`@public/messages/${locale}.json`);

    return { messages };
});
