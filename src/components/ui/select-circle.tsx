'use client';
import cn from '@utils/classname/cn';
import { ButtonHTMLAttributes } from 'react';

interface ISelectCircle extends ButtonHTMLAttributes<HTMLButtonElement> {
    isSelected: boolean;
}

export default function SelectCircle({ isSelected = false, onClick, children }: Readonly<ISelectCircle>) {
    return (
        <button type="button" onClick={onClick} className="flex items-center min-h-[60px]">
            <span
                className={cn(
                    // eslint-disable-next-line quotes
                    "relative h-[20px] w-[20px] my-1 mx-2 border border-solid border-gray-border rounded-full flex-none cursor-pointer before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:top-1 before:left-1 before:rounded-full",
                    {
                        'before:transition-all before:bg-red-coolpc': isSelected,
                    }
                )}
            ></span>
            {children}
        </button>
    );
}
