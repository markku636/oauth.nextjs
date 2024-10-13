import { ReactNode } from 'react';

export interface StaticInformationWrapperProps {
    sectionTitle: string;
    children: ReactNode;
}

export default function StaticInformationWrapper({ sectionTitle, children }: StaticInformationWrapperProps) {
    return (
        <div className="mt-9 md:mt-12 lg:mt-20 w-full flex flex-col items-center pb-12">
            <h1 className="font-bold text-3xl lg:text-4xl">{sectionTitle}</h1>
            <div className="flex flex-col gap-4 mx-5 md:mx-8 lg:mx-20 my-8 md:my-11 lg:my-16 xl:max-w-[1200px] text-[14px] lg:text-[16px] leading-5 md:leading-6 lg:leading-[26px]">
                {children}
            </div>
        </div>
    );
}
