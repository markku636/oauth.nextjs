'use client';
import { useValidateTokenMutation } from '@/redux/api/auth-api-slice';
import { loginSuccess } from '@/redux/reducer/auth/auth-slice';
import { AppState } from '@/redux/reducer/store';
import { Validation } from '@/typing/api/auth-api-type';
import { ApiResponse } from '@/typing/common';
import LoadingIndicator from '@components/ui/loaders/loading-indicator';
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
                .then((data: ApiResponse<Validation>) => {
                    const token = data?.data?.accessToken;

                    if (data && data.isSuccess && token) {
                        dispatch(loginSuccess(data.data));

                        window.location.replace(process.env.NEXT_PUBLIC_BASE_URL);
                    }
                });
        }
    }, [searchParams, validateToken]);

    return (
        <div>
            <LoadingIndicator className="mt-3" />
        </div>
    );
};

export default OAuthCallback;
