import { IHeader } from '@/typing/layout';
import CustomContainer from '@components/ui/custom-container';
import LanguageSwitcher from '@components/ui/language-switcher';
import Logo from '@components/ui/logo';
import cn from '@utils/classname/cn';
import HeaderWithSwither from './header-with-switcher';

interface IHeaderProps {
    header: IHeader;
}

export default function HeaderAuth({ header }: Readonly<IHeaderProps>) {
    const { languageMenu } = header;

    return (
        <HeaderWithSwither languageMenu={languageMenu}>
            <CustomContainer className={cn('flex h-12 md:h-[110px] items-center justify-center')}>
                <div className="flex justify-between w-full md:w-fit">
                    <Logo />
                    <div className="md:hidden">
                        <LanguageSwitcher languageMenu={languageMenu} />
                    </div>
                </div>
            </CustomContainer>
        </HeaderWithSwither>
    );
}
