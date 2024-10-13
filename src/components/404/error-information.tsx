import Link from '@components/ui/link';
import Text from '@components/ui/text';
import Image from 'next/image';
import { IoHomeSharp } from 'react-icons/io5';

const ErrorInformation = () => {
    // const t = useTranslationCommon();

    return (
        <div className="flex items-center justify-center border-b border-t border-gray-300 px-16 py-16 text-center sm:py-20 lg:py-24 xl:py-32">
            <div>
                <Image src="/assets/images/404.svg" alt={'error-heading'} width={822} height={492} />

                <Text variant="mediumHeading">{'error-heading'}</Text>
                <p className="pb-7 pt-2 text-sm leading-7 md:pb-9 md:pt-3.5 md:text-base">{'error-sub-heading'}</p>
                <Link
                    href="/"
                    className="inline-flex cursor-pointer items-center rounded-lg bg-heading px-4 py-2.5 text-[13px] leading-4 text-white transition duration-300 ease-in-out hover:bg-gray-600  hover:text-white hover:shadow-cart md:px-6 md:text-sm lg:py-3 lg:text-base"
                >
                    <IoHomeSharp />
                    <span className=" ltr:pl-1.5 rtl:pr-1.5 ">{'button-go-home'}</span>
                </Link>
            </div>
        </div>
    );
};

export default ErrorInformation;
