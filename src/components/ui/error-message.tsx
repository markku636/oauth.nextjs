import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import cn from '@utils/classname/cn';

export default function ErrorMessage({
    messageKey,
    center = true,
}: Readonly<{ messageKey?: string | null; center?: boolean }>) {
    const t = useTranslationsCommon();

    if (!messageKey) {
        return null;
    }

    return (
        <p
            className={cn(' mt-1 w-fit text-red-coolpc my-2 text-xs', {
                'mx-auto': center,
            })}
        >
            {t(messageKey)}
        </p>
    );
}
