'use client';
import { LocalStorageKeys } from '@/const/keys';
import { useGetUserQuery } from '@/redux/api/auth-api-slice';
import { updateAddressFields } from '@/redux/features/cart/cart-slice';
import { useAppDispatch } from '@/redux/reducer/hooks';
import { UserProfile } from '@/typing/api/auth-api-type';
import { getMemberStatus } from '@utils/authority/authority';
import { useEffect } from 'react';

export default function useLoadShippingAddress() {
    const dispatch = useAppDispatch();
    const { data: memberInfo, isLoading } = useGetUserQuery();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const memberStatus = getMemberStatus(memberInfo?.memID);
        const hasMemberInfo = memberInfo && memberStatus === 'member';

        if (hasMemberInfo) {
            updateAddressFromMemberInfo(memberInfo);
        } else {
            updateAddressFromLocalStorage();
        }

        function updateAddressFromMemberInfo(memberInfo: UserProfile) {
            const addressData = extractAddressData(memberInfo);

            dispatch(updateAddressFields(addressData));
        }

        function extractAddressData(memberInfo: UserProfile) {
            return {
                email: memberInfo.mail ?? '',
                sFirstName: memberInfo.sFirstName ?? '',
                sLastName: memberInfo.sLastName ?? '',
                sCompanyName: memberInfo.sCompanyName ?? '',
                sAddress1: memberInfo.sAddress1 ?? '',
                sAddress2: memberInfo.sAddress2 ?? '',
                sCity: memberInfo.sCity ?? '',
                sZipCode: memberInfo.sZipCode ?? '',
                sCountry: memberInfo.sCountry ?? '',
                sContactNum: memberInfo.sContactNum ?? '',
            };
        }

        function updateAddressFromLocalStorage() {
            try {
                const serializedState = localStorage.getItem(LocalStorageKeys.ShippingAddress);

                if (serializedState) {
                    const parsedState = JSON.parse(serializedState);

                    dispatch(updateAddressFields(parsedState));
                }
            } catch (error) {
                console.error(`Error loading state from ${LocalStorageKeys.ShippingAddress}_localStorage:`, error);
            }
        }
    }, [dispatch, isLoading, memberInfo]);
}
