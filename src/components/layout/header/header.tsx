import { IHeader } from '@/typing/layout';
import CustomContainer from '@components/ui/custom-container';
import LanguageSwitcher from '@components/ui/language-switcher';
import Logo from '@components/ui/logo';
import cn from '@utils/classname/cn';
import HeaderWithSwither from './header-with-switcher';

import MenuButtons from './menu-buttons';
import Menu from './new-header-menu';

interface IHeaderProps {
    header: IHeader;
}

export default function Header({ header }: Readonly<IHeaderProps>) {
    const { languageMenu, menu, accountDropdown } = header;

    return (
        <HeaderWithSwither languageMenu={languageMenu}>
            <CustomContainer
                className={cn('flex h-[45px] items-center justify-center lg:justify-between md:h-[75px] w-full')}
            >
                <div className="flex justify-between w-full md:w-fit">
                    <Logo />
                    <div className="md:hidden">
                        <LanguageSwitcher languageMenu={languageMenu} />
                    </div>
                    <Menu menu={menu} />
                </div>
                <MenuButtons accountDropdown={accountDropdown} />
            </CustomContainer>
        </HeaderWithSwither>
    );
}
