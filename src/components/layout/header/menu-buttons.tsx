'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { logoutSuccess } from '@/redux/reducer/auth/auth-slice';
import { AppState } from '@/redux/reducer/store';

import { IAccountDropdown } from '@/typing/layout';
import { useRouter } from 'next/navigation';
import { TbLogin2, TbLogout2 } from 'react-icons/tb';

import { useDispatch, useSelector } from 'react-redux';

export default function MenuButtons({ accountDropdown }: Readonly<{ accountDropdown: IAccountDropdown }>) {
    const t = useTranslationsCommon();
    const router = useRouter();

    const dispatch = useDispatch();
    const { isAuthenticated, accessToken } = useSelector((state: AppState) => state.auth);

    const logout = () => {
        dispatch(logoutSuccess());
    };
    const login = () => {
        router.push('/login');
    };

    return (
        <div className="items-center justify-end flex-shrink-0 hidden gap-x-6 lg:flex lg:gap-x-10">
            {isAuthenticated ? (
                <div className="flex cursor-pointer item-center" onClick={logout}>
                    <div className="mr-1"> {t('logout')}</div>
                    <TbLogin2 />
                </div>
            ) : (
                <div className="flex items-center cursor-pointer" onClick={login}>
                    <div className="mr-1">{t('login')}</div>
                    <TbLogout2 />
                </div>
            )}
        </div>
    );
}
