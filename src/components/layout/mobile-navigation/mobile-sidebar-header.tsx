'use client';
import { useAppDispatch } from '@/redux/features/hooks';
import { closeSidebar } from '@/redux/features/ui/ui-slice';
import Logo from '@components/ui/logo';
import { IoClose } from 'react-icons/io5';

export default function MobileSidebarHeader() {
    const dispatch = useAppDispatch();

    return (
        <div className="relative flex items-center justify-between w-full px-6 border-b border-gray-200">
            <Logo />
            <button
                className="flex items-center justify-center p-4 text-2xl text-gray-500 transition-opacity hover:opacity-60 focus:outline-none md:px-6"
                onClick={() => dispatch(closeSidebar())}
                aria-label="close"
            >
                <IoClose className="text-black " />
            </button>
        </div>
    );
}
