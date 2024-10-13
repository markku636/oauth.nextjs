'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { useSsrCompatible } from '@/hooks/use-ssr-compatible';
import Link from '@components/ui/link';
import Text from '@components/ui/text';
import cn from 'classnames';
import Image from 'next/image';

const data = {
    title: 'app-heading',
    subTitle: 'app-sub-heading',
    appImage: '/assets/images/app.png',
    appImage2: '/assets/images/app2.png',
    appImage3: '/assets/images/app3.png',
    appButtons: [
        {
            id: 1,
            slug: '/',
            altText: 'button-app-store',
            appButton: '/assets/images/app-store.svg',
            buttonWidth: 209,
            buttonHeight: 60,
        },
        {
            id: 2,
            slug: '/',
            altText: 'button-play-store',
            appButton: '/assets/images/play-store.svg',
            buttonWidth: 209,
            buttonHeight: 60,
        },
    ],
};

interface Props {
    className?: string;
    variant?: 'modern' | 'ancient';
    disableBorderRadius?: boolean;
}

const DownloadApps: React.FC<Props> = ({ className, variant, disableBorderRadius = false }) => {
    const { appButtons, title, subTitle, appImage, appImage2, appImage3 } = data;
    const t = useTranslationsCommon();
    const hasMounted = useSsrCompatible(true, false);

    return (
        <div
            className={cn(
                'flex items-end justify-between rounded-lg bg-gray-200 px-6 pt-5 md:px-12 md:pt-8 lg:px-20 lg:pt-10 xl:pt-14 2xl:px-24 3xl:px-36',
                className
            )}
        >
            <div className="w-full flex-shrink-0 pb-5 sm:w-60 md:w-96 md:pb-8 lg:flex lg:w-auto lg:max-w-lg lg:items-center lg:pb-12 xl:max-w-xl xl:pb-16">
                <div className="py-4 text-center ltr:sm:text-left rtl:sm:text-right md:py-6 xl:py-8">
                    <Text variant="mediumHeading" className="-mt-1 mb-2 md:mb-3 lg:mb-3.5 xl:mb-4">
                        {t(`${title}`)}
                    </Text>
                    {hasMounted && (
                        <h2
                            className="text-md mb-6 font-normal leading-7 text-heading sm:text-xl sm:leading-8 md:mb-8 md:text-3xl md:leading-snug lg:mb-9 ltr:lg:pr-20 rtl:lg:pl-20 xl:mb-12 xl:text-4xl xl:leading-relaxed 2xl:mb-14 2xl:text-5xl 2xl:leading-snug ltr:2xl:pr-0 rtl:2xl:pl-0"
                            dangerouslySetInnerHTML={{
                                __html: t(`${subTitle}`),
                            }}
                        />
                    )}
                    <div className="flex justify-center gap-x-2 px-6 sm:justify-start sm:px-0 md:gap-x-3">
                        {appButtons?.map((item) => (
                            <Link
                                key={item.id}
                                href={item.slug}
                                className="hover:box-shadow inline-flex transition duration-200 ease-in hover:opacity-80"
                            >
                                <img
                                    src={item.appButton}
                                    alt={t(`${item.altText}`)}
                                    className={`w-36 lg:w-44 xl:w-auto ${!disableBorderRadius && 'rounded-md'}`}
                                    width={item.buttonWidth}
                                    height={item.buttonHeight}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden w-60 items-end ltr:-mr-0.5 ltr:pl-4 rtl:-ml-0.5 rtl:pr-4 sm:flex md:w-72 lg:w-96 xl:w-auto ltr:2xl:-mr-1.5 rtl:2xl:-ml-1.5">
                <Image
                    src={variant === 'modern' ? appImage2 : variant === 'ancient' ? appImage3 : appImage}
                    alt={t('text-app-thumbnail')}
                    width={375}
                    height={430}
                />
            </div>
        </div>
    );
};

export default DownloadApps;
