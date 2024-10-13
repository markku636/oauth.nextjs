import { IFooter } from '@/typing/layout';
import NewCopyright from './new-copyright';

interface FooterProps {
    footer: IFooter;
}

export default function Footer({ footer }: Readonly<FooterProps>) {
    const { copyright } = footer;

    return (
        <footer className="mb-[50px] border border-x-0 border-b-0 border-t-[#ddd] bg-gray-coolpc pt-2.5 shadow-2xl lg:mb-0 lg:pt-0 2xl:pt-2">
            <NewCopyright copyright={copyright} />
        </footer>
    );
}
