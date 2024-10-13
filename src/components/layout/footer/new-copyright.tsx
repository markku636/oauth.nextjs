import { ICopyright } from '@/typing/layout';
import CustomContainer from '@components/ui/custom-container';
import CopyrightLinks from './copy-right-links';

interface ICopyrightProps {
    copyright: ICopyright;
}

const NewCopyright = ({ copyright }: ICopyrightProps) => {
    return (
        <section className="w-full bg-black">
            <CustomContainer className="py-3 sm:py-4">
                <section className="flex items-center justify-between gap-2 text-xs text-gray-light sm:flex-row">
                    <div className="flex flex-wrap gap-2 xl:gap-10">
                        <p className="flex-wrap">&copy; {copyright.textLang}.</p>
                        <CopyrightLinks informations={copyright.informations} />
                    </div>
                </section>
            </CustomContainer>
        </section>
    );
};

export default NewCopyright;
