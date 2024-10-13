'use client';
import { useAppDispatch, useAppSelector } from '@/redux/features/hooks';
import { closeCart, selectUI } from '@/redux/features/ui/ui-slice';

import { Drawer } from '@components/common/drawer/drawer';
import motionProps from '@components/common/drawer/motion';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/navigation';

const ManagedDrawer = () => {
    const { displayCart } = useAppSelector(selectUI);
    const dispatch = useAppDispatch();
    const { locale } = useRouter();
    const dir = getDirection(locale);
    const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };

    return (
        <Drawer
            open={displayCart}
            placement={dir === 'rtl' ? 'left' : 'right'}
            onClose={() => dispatch(closeCart())}
            contentWrapperStyle={contentWrapperCSS}
            {...motionProps}
        ></Drawer>
    );
};

export default ManagedDrawer;
