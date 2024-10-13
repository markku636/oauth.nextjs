import { ApiResponse } from '@/typing/common';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && error !== undefined && 'status' in error;
}

export function isApiResponseType(response: unknown): response is ApiResponse<any> {
    return (
        response !== null &&
        typeof response === 'object' &&
        'data' in response &&
        'count' in response &&
        'isSuccess' in response &&
        'code' in response &&
        'message' in response &&
        'errors' in response
    );
}
