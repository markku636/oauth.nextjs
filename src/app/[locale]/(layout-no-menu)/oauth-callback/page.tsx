'use client';
import { useValidateTokenMutation } from '@/redux/api/auth-api-slice';
import { loginSuccess } from '@/redux/reducer/auth/auth-slice';
import { AppState } from '@/redux/reducer/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OAuthCallback = () => {
    const searchParams = useSearchParams();

    const [validateToken, { isLoading }] = useValidateTokenMutation();

    const { isAuthenticated, accessToken } = useSelector((state: AppState) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const code = searchParams?.get('code');

        if (code) {
            validateToken(code)
                .unwrap()
                .then((data) => {
                    const token = data?.data?.accessToken;

                    if (token) {
                        dispatch(loginSuccess(data.data));
                        window.location.replace(process.env.NEXT_PUBLIC_BASE_URL);
                    }
                });
        }
    }, [searchParams, validateToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Access Token: {accessToken ? accessToken : 'No access token available'}-{' '}
            {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </div>
    );
};

export default OAuthCallback;
