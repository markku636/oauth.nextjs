import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function useDelayRedirect(redirectPath: string, delay: number = 5) {
    const countdownRef = useRef<number>(delay);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            countdownRef.current--;
            if (countdownRef.current <= 0) {
                clearInterval(interval);
                router.push(redirectPath);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [redirectPath, router]);
}
