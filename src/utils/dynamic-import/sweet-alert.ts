import { ApiReturnCode } from '@/const/api/api';
import { clientSideLog } from '@utils/log/client-side-log';
import { LogLevel } from '@utils/log/const-logging';
import { Formats, TranslationValues } from 'next-intl';

export default async function dynamicSwal() {
    try {
        const Swal = await import('sweetalert2');

        return Swal.default;
    } catch (err) {
        clientSideLog('Failed to load sweetalert2, DE website', LogLevel.Error);
        return Promise.reject(err);
    }
}

export async function showSuccessSwal({
    title,
    text,
    confirmButtonText = 'OK',
}: {
    title: string;
    text?: string;
    confirmButtonText?: string;
}): Promise<boolean> {
    const Swl = await dynamicSwal();
    const swalResult = await Swl.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText,
    });

    return swalResult.isConfirmed;
}

export async function showErrorSwal({
    titleKey = 'error-message-error',
    descriptionKey = '',
    confirmButtonKey = 'text-ok',
    returnCode,
    translateFn,
}: {
    titleKey?: string;
    descriptionKey?: string;
    confirmButtonKey?: string;
    returnCode?: ApiReturnCode;
    translateFn?: (key: any, values?: TranslationValues | undefined, formats?: Partial<Formats> | undefined) => string;
}): Promise<boolean> {
    const Swl = await dynamicSwal();
    const title = translateFn ? translateFn(titleKey) : titleKey;
    const description = translateFn ? translateFn(descriptionKey) : descriptionKey;
    const confirmButtonText = translateFn ? translateFn(confirmButtonKey) : confirmButtonKey;

    const swalResult = await Swl.fire({
        title: title,
        text: returnCode ? `${description} (${returnCode})` : description,
        icon: 'error',
        confirmButtonText: confirmButtonText,
    });

    return swalResult.isConfirmed;
}

export async function showWarningSwal({
    title = 'Warning',
    descriptionText = 'Are you sure?',
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    confirmAction,
}: {
    title?: string;
    descriptionText?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmAction: () => void;
}): Promise<boolean> {
    const Swl = await dynamicSwal();
    const swalResult = await Swl.fire({
        title: title,
        html: descriptionText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    });

    if (swalResult.isConfirmed) {
        confirmAction();
    }

    return swalResult.isConfirmed;
}
