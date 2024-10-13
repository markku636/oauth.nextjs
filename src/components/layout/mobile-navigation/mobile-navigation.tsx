'use client';
import { useAppDispatch, useAppSelector } from '@/redux/features/hooks';
import { closeSidebar, openSidebar, selectUI } from '@/redux/features/ui/ui-slice';
import { IHeader } from '@/typing/layout';
import motionProps from '@components/common/drawer/motion';
import HomeIcon from '@components/icons/home-icon';
import MenuIcon from '@components/icons/menu-icon';
import Link from '@components/ui/link';
import dynamic from 'next/dynamic';

const NewMobileSidebar = dynamic(() => import('@components/layout/header/new-mobile-sidebar'));
const Drawer = dynamic(() => import('@components/common/drawer/drawer').then((mod) => mod.Drawer));

interface IMobileNavigation {
    header: IHeader;
}

const MobileNavigation = ({ header }: IMobileNavigation) => {
    const { displaySidebar } = useAppSelector(selectUI);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="body-font fixed bottom-0 z-40 flex h-[50px] w-full items-center justify-between bg-white px-4 text-gray-700 shadow-bottomNavigation md:px-8 lg:hidden">
                <button
                    aria-label="Menu"
                    className="flex flex-col items-center justify-center flex-shrink-0 outline-none menuBtn focus:outline-none"
                    onClick={() => dispatch(openSidebar())}
                >
                    <MenuIcon />
                </button>
                <Link href="/" className="flex-shrink-0">
                    <HomeIcon />
                </Link>
            </div>
            {displaySidebar && (
                <Drawer
                    placement={'left'}
                    open={displaySidebar}
                    onClose={() => dispatch(closeSidebar())}
                    {...motionProps}
                    width={330}
                >
                    <NewMobileSidebar header={header} />
                </Drawer>
            )}
        </>
    );
};

export default MobileNavigation;
