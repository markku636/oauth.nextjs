'use client';
import cn from '@utils/classname/cn';
import React, { ReactNode, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Overlay from './overlay';

interface ModalProps {
    isOpen: boolean;
    title?: string;
    customClassNames?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export default function Modal({
    isOpen = false,
    title = '',
    customClassNames = '',
    onClose,
    children,
}: Readonly<ModalProps>) {
    const modalInnerRef = useRef<HTMLDivElement>(null);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={cn('fixed inset-0 z-[99] flex items-center justify-center')} ref={modalInnerRef}>
            <ModalContainer customClassNames={customClassNames}>
                <ModalHeader onClose={onClose}>{title}</ModalHeader>
                <div className="h-[calc(100%-48px)] overflow-y-auto overscroll-contain">{children}</div>
            </ModalContainer>
            <Overlay onClose={onClose} />
        </div>
    );
}

function ModalContainer({ customClassNames, children }: Readonly<{ customClassNames: string; children: ReactNode }>) {
    return (
        <div className={cn('z-[999] flex flex-col rounded-lg bg-white p-6 overflow-y-auto', customClassNames)}>
            {children}
        </div>
    );
}

function ModalHeader({
    onClose,
    children,
}: Readonly<{
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}>) {
    return (
        <div id="modal-header" className="relative flex min-h-[20px] items-end justify-center">
            <div className="flex w-full items-center justify-between">
                <div className="h-full flex-grow text-center">{children}</div>
                <button onClick={onClose} className="h-full">
                    <IoCloseOutline className="h-9 w-9" />
                </button>
            </div>
        </div>
    );
}
