import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your API slice

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
    }),
    endpoints: (builder) => ({
        validateToken: builder.mutation({
            query: (code) => ({
                url: '/api/oauth/validate',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { code },
            }),
        }),
    }),
});

// Export the auto-generated hook
export const { useValidateTokenMutation } = authApi;
