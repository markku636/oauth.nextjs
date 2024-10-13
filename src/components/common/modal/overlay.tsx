'use client';

import cn from '@utils/classname/cn';

interface Props {
    onClose: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void;
    fadeIn?: boolean;
    zIndex?: number;
    className?: string;
}

export default function Overlay({ onClose, fadeIn = false, zIndex = 30, className = '' }: Readonly<Props>) {
    return (
        <div
            id="overlay"
            className={cn(
                'fixed inset-0 bg-black bg-opacity-40',
                `z-${zIndex}`,
                {
                    'animate-overlay': fadeIn,
                },
                className
            )}
            onClick={onClose}
        />
    );
}
