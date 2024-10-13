'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TESTER = 'tester';
const TEST_MODE_QUERY = {
    LOGIN_VALUE: 'ibp666',
    LOGOUT_VALUE: 'clean',
};

export default function useIsTestMode() {
    const searchParams = useSearchParams();

    const [isTestMode, setIsTestMode] = useState(false);

    const testModeQueryValue = searchParams?.get(TESTER) ?? '';

    useEffect(() => {
        const localStorageItem = window.localStorage.getItem(TESTER);

        if (testModeQueryValue === TEST_MODE_QUERY.LOGIN_VALUE) {
            alert('Test mode login');

            window.localStorage.setItem(TESTER, TEST_MODE_QUERY.LOGIN_VALUE);
            setIsTestMode(true);
        }
        if (localStorageItem === TEST_MODE_QUERY.LOGIN_VALUE) {
            setIsTestMode(true);
        }

        if (testModeQueryValue === TEST_MODE_QUERY.LOGOUT_VALUE) {
            alert('Test mode logout');
            window.localStorage.removeItem(TESTER);
            setIsTestMode(false);
        }
    }, [testModeQueryValue]);

    return {
        isTestMode,
    };
}
