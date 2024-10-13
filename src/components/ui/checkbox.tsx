'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelKey?: string;
    label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(({ labelKey, label, ...rest }, ref) => {
    const t = useTranslations('common');

    return (
        <div className="group flex items-center text-sm text-heading">
            <label className="cursor-pointer flex">
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 cursor-pointer rounded border border-gray-300 transition duration-500 ease-in-out checked:bg-heading hover:border-heading checked:hover:bg-heading focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:bg-heading focus-visible:outline-none"
                    ref={ref}
                    {...rest}
                />
                {labelKey && <span className="ms-4">{t(labelKey)}</span>}
                {label && <span className="ms-4">{label}</span>}
            </label>
        </div>
    );
});

CheckBox.displayName = 'CheckBox';
