import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth-api-slice';
import authReducer from './auth/auth-slice';
import uiReducer from './ui/ui-slice';

// 將應用的完整狀態保存到 localStorage
const saveToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('appState', serializedState); // 保存所有狀態到 localStorage
    } catch (e) {
        console.warn('Could not save state to localStorage', e);
    }
};

// 從 localStorage 中加載應用的完整狀態
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) return undefined; // 沒有存儲的狀態時返回 undefined
        return JSON.parse(serializedState); // 解析並返回存儲的狀態
    } catch (e) {
        return undefined;
    }
};

// Middleware，用於攔截 action 並將整個應用的狀態保存到 localStorage
const localStorageMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action); // 執行下一個 middleware 或 reducer
    saveToLocalStorage(storeAPI.getState()); // 將整個應用狀態保存到 localStorage
    return result;
};

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    // 在此處添加更多 reducer，例如其他 slice
});

// 從 localStorage 中加載的初始狀態
const preloadedState = loadFromLocalStorage();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware, authApi.middleware), // 加入 localStorage 和 API middleware
    preloadedState, // 使用從 localStorage 加載的狀態作為初始狀態
    devTools: process.env.NODE_ENV !== 'production', // 僅在開發模式下啟用 DevTools
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
