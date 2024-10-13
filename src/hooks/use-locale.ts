'use client';
import { usePathname } from 'next/navigation';

export default function usePageLocale() {
    const pathName = usePathname();

    if (!pathName) {
        return '';
    }

    const segments = pathName.split('/');

    return segments[1];
}
