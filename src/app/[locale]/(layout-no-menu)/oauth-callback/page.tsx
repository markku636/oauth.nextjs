'use client';
import { useValidateTokenMutation } from '@/redux/api/auth-api-slice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OAuthCallback = () => {
    const searchParams = useSearchParams();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    const [validateToken, { isLoading }] = useValidateTokenMutation();

    useEffect(() => {
        const code = searchParams?.get('code');

        if (code) {
            // Use RTK mutation to validate the token
            validateToken(code)
                .unwrap()
                .then((data) => {
                    const token = data?.data?.accessToken;

                    if (token) {
                        setAccessToken(token);
                        // Optionally store access_token in a cookie, localStorage, or context
                    }
                });
        }
    }, [searchParams, validateToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Access Token: {accessToken ? accessToken : 'No access token available'}</div>;
};

export default OAuthCallback;
