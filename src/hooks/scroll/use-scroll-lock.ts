import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { RefObject, useEffect } from 'react';

export default function useBodyScrollLock(isOpen: boolean, ref: RefObject<HTMLElement>) {
    useEffect(() => {
        if (!ref.current) {
            return;
        }

        if (isOpen) {
            disableBodyScroll(ref.current);
        } else {
            enableBodyScroll(ref.current);
        }

        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isOpen, ref]);
}
