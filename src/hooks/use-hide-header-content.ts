'use client';
import { CartStep, useSelectCartStep } from '@/redux/features/cart/cart-slice';
import { Routes } from '@utils/routes';
import { usePathname } from 'next/navigation';

export default function useHideHeaderContent() {
    const pathname = usePathname();
    const cartStep = useSelectCartStep();

    const isCartCheckout = pathname?.endsWith(Routes.Carts) && cartStep === CartStep.Checkout;
    const isOrderConfirm = pathname?.endsWith(Routes.OrderConfirm);

    const hideHeader = isCartCheckout || isOrderConfirm;

    return hideHeader;
}
