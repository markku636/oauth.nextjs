import { RefObject, useCallback, useEffect, useRef } from 'react';

// @see https://github.com/akiran/react-slick/issues/1240#issuecomment-513235261
export function usePreventVerticalScroll<T extends HTMLElement>(ref: RefObject<T>, dragThreshold = 5) {
    const firstClientX = useRef<number>(0); // touch start clientX
    const clientX = useRef<number>(0); // touch move clientX

    const preventTouch = useCallback(
        (e: TouchEvent) => {
            clientX.current = e.touches[0].clientX - firstClientX.current;
            // Vertical scrolling does not work when you start swiping horizontally.
            if (Math.abs(clientX.current) > dragThreshold && e.cancelable) {
                e.preventDefault();
                e.returnValue = false;
                return false;
            }

            return true;
        },
        [dragThreshold]
    );

    const touchStart = useCallback((e: TouchEvent) => {
        firstClientX.current = e.touches[0].clientX;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        let isChrome = false;

        if (window.navigator.userAgent.includes('Chrome')) {
            isChrome = true;
        }

        const current = ref.current;

        if (current) {
            current.addEventListener('touchstart', touchStart, { passive: isChrome });
            current.addEventListener('touchmove', preventTouch, { passive: isChrome });
        }

        return () => {
            if (current) {
                current.removeEventListener('touchstart', touchStart);
                current.removeEventListener('touchmove', preventTouch);
            }
        };
    }, [preventTouch, ref, touchStart]);
}
