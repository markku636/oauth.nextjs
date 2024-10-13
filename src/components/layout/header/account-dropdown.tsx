'use client';
import { LocalStorageKeys } from '@/const/keys';

import { DEFAULT_ADDRESS_FIELDS, updateAddressFields } from '@/redux/features/cart/cart-slice';
import { useAppDispatch } from '@/redux/features/hooks';
import { closeHeaderModal, useSelectUI } from '@/redux/features/ui/ui-slice';
import { IAccountDropdown } from '@/typing/layout';
import cn from '@utils/classname/cn';
import { Routes } from '@utils/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    className?: string;
    accountDropdown: IAccountDropdown;
}

export default function AccountDropdown({ accountDropdown, className = '' }: Readonly<Props>) {
    const { orderStatusTextLang, signOutGuestTextLang } = accountDropdown;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { headerModalView } = useSelectUI();

    const handlelogout = () => {
        localStorage.removeItem(LocalStorageKeys.AccessToken);
        dispatch(updateAddressFields(DEFAULT_ADDRESS_FIELDS));
        dispatch(closeHeaderModal());
        router.push(Routes.Home);
    };

    if (headerModalView !== 'ACCOUNT') {
        return <></>;
    }

    return (
        <div
            className={cn(
                'absolute bottom-[50px] right-0 z-20 flex w-[200px] origin-top animate-dropdown flex-col items-start rounded-md bg-white p-1 text-sm lg:bottom-auto lg:left-[-80px] lg:top-[60px] lg:w-[250px]',
                className
            )}
        >
            <Link
                href={Routes.SupportOrderStatus}
                className="w-full px-2 py-3 whitespace-nowrap hover:cursor-pointer hover:bg-gray-coolpc"
            >
                {orderStatusTextLang}
            </Link>
            <button className="w-full px-2 py-3 text-left hover:bg-gray-coolpc" onClick={handlelogout}>
                {signOutGuestTextLang}
            </button>
        </div>
    );
}
