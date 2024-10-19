import { createSlice } from '@reduxjs/toolkit';

export type AuthState = {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;
    expiresAt: string | null;
    error: string | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    userId: null,
    expiresAt: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;
            state.expiresAt = action.payload.expiresAt;
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = null;
            state.expiresAt = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
