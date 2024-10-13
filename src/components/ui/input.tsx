'use client';
import styles from '@styles/form/input.module.scss';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import React, { InputHTMLAttributes } from 'react';
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    labelKey?: string;
    placeholderKey?: string;
    name: string;
    errorKey?: string;
    type?: string;
    shadow?: boolean;
    disableBorderRadius?: boolean;
    variant?: 'normal' | 'solid' | 'outline';
}
const classes = {
    root: 'w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out pt-6 pb-2 pr-12 pl-2.5',
    normal: 'bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-primary',
    solid: 'bg-white border-gray-300 focus:outline-none focus:border-heading h-12',
    outline: 'border-gray-300 focus:border-primary',
    shadow: 'focus:shadow',
};
const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            className = 'block',
            labelKey,
            name,
            errorKey,
            placeholderKey = '',
            variant = 'normal',
            shadow = false,
            type = 'text',
            disableBorderRadius = false,
            inputClassName,
            disabled,
            ...rest
        },
        ref
    ) => {
        const t = useTranslations('common');
        const rootClassName = cn(
            classes.root,
            {
                [classes.normal]: variant === 'normal',
                [classes.solid]: variant === 'solid',
                [classes.outline]: variant === 'outline',
            },
            {
                [classes.shadow]: shadow,
            },
            {
                '!bg-gray-100 ': disabled,
            },
            inputClassName
        );

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
                        type={type}
                        ref={ref}
                        className={rootClassName + `${!disableBorderRadius && ' rounded-md'}`}
                        placeholder=" " // keep this value for styling
                        autoComplete="off"
                        spellCheck="false"
                        aria-invalid={errorKey ? 'true' : 'false'}
                        disabled={disabled}
                        {...rest}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 py-2.5 px-3 left-0 pointer-events-none text-gray-input">
                        {t(placeholderKey)}
                    </span>
                </div>
                {errorKey && <p className="my-2 text-xs text-red-500">{t(errorKey)}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
