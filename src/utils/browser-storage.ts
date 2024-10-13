import { LocalStorageKeys, SessionStorageKeys } from '@/const/keys';

export function saveLocalStorage(key: LocalStorageKeys, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function saveSessionStorage(key: SessionStorageKeys, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

export function getSessionStorage<T>(key: string): T | null {
    try {
        const data = sessionStorage.getItem(key);

        if (!data) {
            throw new Error('No data found in session storage');
        }

        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
}
