'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useRef } from 'react';

function Providers({ children }: React.PropsWithChildren) {
    const queryClientRef = useRef<any>();

    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
    }

    return (
        <QueryClientProvider client={queryClientRef.current}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}

export default Providers;
