import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart/cart-slice';

import uiReducer from './ui/ui-slice';

const rootReducer = combineReducers({
    cart: cartReducer,
    ui: uiReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
