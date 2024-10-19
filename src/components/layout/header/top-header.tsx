'use client';
import { ILanguageMenu } from '@/typing/layout';
import CustomContainer from '@components/ui/custom-container';
import LanguageSwitcher from '@components/ui/language-switcher';

interface ITopHeader {
    languageMenu: ILanguageMenu[];
    chatText: string;
}

export default function TopHeader({ languageMenu }: Readonly<ITopHeader>) {
    return (
        <div className="flex justify-end mx-auto md:py-2 bg-gray-150">
            <CustomContainer className="flex items-center justify-between w-full gap-1 md:justify-end">
                <div className="flex items-center justify-end gap-1 lg:gap-3">
                    <div className="hidden md:block">
                        <LanguageSwitcher languageMenu={languageMenu} />
                    </div>
                </div>
            </CustomContainer>
        </div>
    );
}
