import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from '../api/auth-api-slice';
import authReducer from './auth/auth-slice';
import uiReducer from './ui/ui-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware), // Add the API middleware
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
