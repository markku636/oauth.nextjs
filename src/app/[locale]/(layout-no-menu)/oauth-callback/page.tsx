'use client';
import { useValidateTokenMutation } from '@/redux/api/auth-api-slice';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OAuthCallback = () => {
    const searchParams = useSearchParams();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [validateToken, isLoading] = useValidateTokenMutation();

    useEffect(() => {
        const code = searchParams?.get('code');

        if (code) {
            // Use RTK mutation to validate the token
            validateToken(code)
                .unwrap()
                .then((data) => {
                    if (data.access_token) {
                        setAccessToken(data.access_token);
                        // Optionally store access_token in a cookie, localStorage, or context
                    } else {
                        setError('No access token received');
                    }
                })
                .catch((err) => {
                    console.error('Error validating OAuth token:', err);
                    setError('Failed to validate token');
                });
        } else {
            setError('No code found in the URL');
        }
    }, [searchParams, validateToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>Access Token: {accessToken ? accessToken : 'No access token available'}</div>;
};

export default OAuthCallback;
