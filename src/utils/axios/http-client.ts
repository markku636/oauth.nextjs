import axios from 'axios';
import { NextApiRequest } from 'next';
import { Axios } from './context/axios/axios-context';
import { buildCookieString } from './handler/master.api';
import { isServerSide } from './utils';

function addBaseURL(url: string) {
    return !url.includes('http') && isServerSide() ? $projects.baseUrl + url : url;
}

export function getHeaderWithSession(req: NextApiRequest) {
    return {
        headers: {
            Cookie: buildCookieString(req),
            'Content-Type': 'application/json',
        },
    };
}

export class HttpClient {
    static async get<T>(url: string, params?: unknown, options?: any) {
        const response = await Axios.get<T>(addBaseURL(url), { params, ...options });

        return response.data;
    }

    static async post<T>(url: string, data: unknown, options?: any) {
        const response = await Axios.post<T>(addBaseURL(url), data, options);

        return response.data;
    }

    static async put<T>(url: string, data: unknown, options?: any) {
        const response = await Axios.put<T>(addBaseURL(url), data, options);

        return response.data;
    }

    static async patch<T>(url: string, data: unknown, options?: any) {
        const response = await Axios.patch<T>(addBaseURL(url), data, options);

        return response.data;
    }

    static async delete<T>(url: string, options?: any) {
        const response = await Axios.delete<T>(addBaseURL(url), options);

        return response.data;
    }
}

export function getFormErrors(error: unknown) {
    if (axios.isAxiosError(error)) {
        return error.response?.data.message;
    }
    return null;
}

export function getFieldErrors(error: unknown) {
    if (axios.isAxiosError(error)) {
        return error.response?.data.errors;
    }
    return null;
}
