'use client';
import useOnClickOutside from '@/hooks/use-click-outside';
import { useAppDispatch } from '@/redux/reducer/hooks';
import { closeModal } from '@/redux/reducer/ui/ui-slice';
import { Portal } from '@reach/portal';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { zoomOutIn } from '@utils/motion/zoom-out-in';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
    open?: boolean;
    onClose: () => void;
    rootClassName?: string;
    useBlurBackdrop?: boolean;
    containerClassName?: string;
    variant?: 'center' | 'bottom';
};
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

// variant based classes for modal root, container & close btn
const rootClasses = {
    center: 'p-4 md:p-5',
    bottom: 'p-5 pb-0',
};
const containerClasses = {
    center: 'h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg',
    bottom: 'h-full max-h-70vh bottom-0 ltr:rounded-tr-2xl rtl:rounded-tl-2xl ltr:rounded-tl-2xl rtl:rounded-tr-2xl',
};
const closeBtnClasses = {
    center: '-top-3 md:-top-4 ltr:-right-3 rtl:-left-3 ltr:md:-right-4 rtl:md:-left-4',
    bottom: 'top-1/4 ltr:left-1/2 rtl:right-1/2 transform -translate-y-1/2 -translate-x-1/2',
};

export default function Modal({
    children,
    open,
    onClose,
    rootClassName,
    useBlurBackdrop,
    containerClassName,
    variant = 'center',
}: React.PropsWithChildren<ModalProps>) {
    const dispatch = useAppDispatch();

    const modalRootRef = useRef() as DivElementRef;
    const modalInnerRef = useRef() as DivElementRef;

    useOnClickOutside(modalInnerRef, () => dispatch(closeModal()));

    useEffect(() => {
        if (modalInnerRef.current) {
            if (open) {
                disableBodyScroll(modalInnerRef.current);
            } else {
                enableBodyScroll(modalInnerRef.current);
            }
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [open]);
    return (
        <Portal>
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={modalRootRef}
                        key="modal"
                        initial="from"
                        animate="to"
                        exit="from"
                        variants={fadeInOut(0.25)}
                        className={cn(
                            'modal-root fixed inset-0 z-50 cursor-pointer bg-black bg-opacity-70',
                            useBlurBackdrop && 'backdrop-blur-sm backdrop-filter',
                            rootClasses[variant],
                            rootClassName
                        )}
                    >
                        <motion.div
                            initial="from"
                            animate="to"
                            exit="from"
                            variants={zoomOutIn()}
                            className="relative mx-auto h-full w-full"
                        >
                            <div
                                className={cn(
                                    'absolute left-1/2 -translate-x-1/2 transform shadow-xl w-auto',
                                    containerClasses[variant],
                                    containerClassName
                                )}
                            >
                                <button
                                    onClick={onClose}
                                    aria-label="Close panel"
                                    className={cn(
                                        'fixed z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-200 hover:text-gray-800 hover:shadow-md focus:text-gray-800 focus:shadow-md focus:outline-none md:h-8 md:w-8',
                                        closeBtnClasses[variant]
                                    )}
                                >
                                    <IoClose className="text-xl" />
                                </button>
                                <div
                                    ref={modalInnerRef}
                                    className="h-full overflow-y-auto rounded-lg"
                                    style={{ maxHeight: 'calc(100vh - 120px)' }}
                                >
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
}
