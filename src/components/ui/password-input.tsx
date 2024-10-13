'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { Eye } from '@components/icons/eye-icon';
import { EyeOff } from '@components/icons/eye-off-icon';
import styles from '@styles/form/input.module.scss';
import cn from 'classnames';
import React, { InputHTMLAttributes, useState } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    name: string;
    shadow?: boolean;
    labelKey?: string;
    errorKey?: string | undefined;
    placeholderKey?: string;
}
const classes = {
    root: 'w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out pt-6 pb-2 pr-12 pl-2.5 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md',
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            className = 'block',
            inputClassName,
            name,
            labelKey,
            errorKey,
            placeholderKey = 'form-input-password',
            shadow = false,
            ...rest
        },
        ref
    ) => {
        const rootClassName = cn(classes.root, inputClassName);
        const t = useTranslationsCommon();

        const [show, setShow] = useState(false);

        return (
            <div className={className}>
                {labelKey && (
                    <label htmlFor={name} className="mb-3 block cursor-pointer text-sm leading-none text-gray-600">
                        {t(labelKey)}
                    </label>
                )}
                <div className={styles['input-container']}>
                    <input
                        id={name}
                        name={name}
                        type={show ? 'text' : 'password'}
                        ref={ref}
                        className={rootClassName}
                        placeholder=" "
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        {...rest}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 p-3 left-0 pointer-events-none text-gray-input">
                        {t(placeholderKey)}
                    </span>
                    <button
                        type="button"
                        className="absolute top-1/2 -translate-y-1/2 right-4"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        {show ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                    </button>
                </div>
                {errorKey && <p className="my-2 text-xs text-red-500">{t(errorKey)}</p>}
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
