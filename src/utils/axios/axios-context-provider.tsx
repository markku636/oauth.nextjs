'use client';
import axios from 'axios';
import https from 'https';

// AxiosInstance
export const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: process.env.NODE_ENV === 'development' ? 5000000 : 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

Axios.interceptors.request.use(
    (config) => {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        // 開發環境，取消https證書校驗
        config.httpsAgent = agent;

        // const cookies = Cookies.get(AUTH_TOKEN_KEY);

        const token = '';

        // if (cookies) {
        //   token = JSON.parse(cookies).token;
        // }

        config.headers = {
            ...config.headers,
            // Authorization: `Bearer ${token}`,
        };
        return config;
    },
    (error) => {}
);

// when response back & response error, do something
Axios.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (
            (error.response && error.response.status === 401) ||
            (error.response && error.response.status === 403) ||
            (error.response && error.response.data.message === 'PICKBAZAR_ERROR.NOT_AUTHORIZED')
        ) {
            // Cookies.remove(AUTH_TOKEN_KEY);
            // Router.reload();
        }
        return Promise.reject(error);
    }
);

// Axios.interceptors.request.eject(requestInterceptor);
// Axios.interceptors.response.eject(responseInterceptor);
