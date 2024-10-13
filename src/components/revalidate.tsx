'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RevalidatePath() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const performRevalidate = async (path: string) => {
            const res = await fetch(`/api/revalidate?revalidatePath=${path}`);

            if (!res.ok) {
                alert('Trigger rebuild failed, please try again later!');
                return;
            }

            await res.json();

            alert(`Trigger rebuild is success, please wait a moment for rendering page!(${path})`);
        };

        const shouldForceUpdate = searchParams?.get('forceUpdate');

        if (shouldForceUpdate) {
            const pagePathname = pathname?.slice(3) || '/';

            performRevalidate(pagePathname);
        }
    }, [searchParams, pathname]);

    return null;
}
