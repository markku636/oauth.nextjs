import { IHeader } from '@/typing/layout';
import Scrollbar from '@components/common/scrollbar';
import MobileSidebarHeader from '../mobile-navigation/mobile-sidebar-header';
import SidebarMenu from './sidebar-menu';

interface IMobileMenu {
    header: IHeader;
}

export default function NewMobileSidebar({ header }: Readonly<IMobileMenu>) {
    return (
        <div className="flex flex-col justify-between w-full h-full">
            <MobileSidebarHeader />
            <Scrollbar className="flex-grow mb-auto menu-scrollbar">
                <SidebarMenu menu={header.menu} />
            </Scrollbar>
        </div>
    );
}
