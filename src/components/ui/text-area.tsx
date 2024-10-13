'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import cn from 'classnames';
import React, { TextareaHTMLAttributes } from 'react';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    inputClassName?: string;
    labelKey?: string;
    name: string;
    placeholderKey?: string;
    errorKey?: string;
    shadow?: boolean;
    variant?: 'normal' | 'solid' | 'outline';
    textSize?: 'sm' | 'base';
    rows?: number;
}

const variantClasses = {
    normal: 'bg-white border border-gray-300 focus:shadow focus:outline-none focus:border-heading placeholder-body',
    solid: 'bg-gray-100 border border-gray-100 focus:bg-white focus:border-primary',
    outline: 'border border-gray-300 focus:border-primary',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const t = useTranslationsCommon();
    const {
        className,
        labelKey,
        name,
        placeholderKey,
        errorKey,
        variant = 'normal',
        shadow = false,
        inputClassName,
        textSize = 'sm',
        rows = 4,
        ...rest
    } = props;

    return (
        <div className={className}>
            {labelKey && (
                <label htmlFor={name} className="mb-3 block text-sm font-semibold leading-none text-gray-600">
                    {t(labelKey)}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                className={cn(
                    'flex w-full appearance-none items-center rounded px-4 py-3 text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0 placeholder:text-gray-input',
                    shadow && 'focus:shadow',
                    variantClasses[variant],
                    inputClassName,
                    {
                        'text-sm': textSize === 'sm',
                        'text-base': textSize === 'base',
                    }
                )}
                autoComplete="off"
                spellCheck="false"
                rows={rows}
                ref={ref}
                // @ts-ignore
                placeholder={placeholderKey ? t(placeholderKey) : ''}
                {...rest}
            />
            {errorKey && <p className="my-2 text-xs text-red-500">{t(errorKey)}</p>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
