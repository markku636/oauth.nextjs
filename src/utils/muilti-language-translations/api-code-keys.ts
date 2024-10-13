import { ApiReturnCode } from '@/const/api/api';
import { MessageKeys } from 'next-intl';

export function transformAPICodeToLangKey(code: ApiReturnCode): MessageKeys<any, any> {
    // check that code is in enum
    if (Object.values(ApiReturnCode).includes(code)) {
        return `api-return-code-${code}`;
    }

    return 'error-message-please-try-again';
}
