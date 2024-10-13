import { store } from '@/redux/features/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useLayoutEffect } from 'react';

// TODO: add object-hash to compare the state
export default function usePersistStore(key: string, initialState: any, action: ActionCreatorWithPayload<any, string>) {
    useLayoutEffect(() => {
        try {
            // get state from localstorage
            const serializedState = localStorage.getItem(key);
            // parse state
            const state = serializedState ? JSON.parse(serializedState) : initialState;

            // dispatch state to redux store
            store.dispatch(action(state));
        } catch (error) {
            console.error(`Error loading state from ${key}_localStorage:`, error);
            return initialState;
        }
    }, []);
}
