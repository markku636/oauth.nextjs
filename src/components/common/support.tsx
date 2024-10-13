'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Button from '@components/ui/button';
import Text from '@components/ui/text';
import cn from 'classnames';
import Image from 'next/image';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const data = {
    title: 'support-heading',
    description: 'support-sub-heading',
    buttonText: 'button-chat-services',
    supportImage: '/assets/images/support.png',
};

interface Props {
    className?: string;
}

const Support: React.FC<Props> = ({ className }) => {
    const { title, description, supportImage, buttonText } = data;
    const t = useTranslationsCommon();
    return (
        <div
            className={cn(
                'my-8 pb-5 pt-3 text-center md:my-12 lg:my-16 lg:pb-3.5 lg:pt-1.5 xl:my-20 2xl:pb-5 2xl:pt-2 3xl:my-24 3xl:pt-3',
                className
            )}
        >
            <div className="mx-auto mb-4 max-w-md md:mb-5 xl:mb-8 2xl:mb-10 3xl:mb-12">
                <Text variant="mediumHeading" className="mb-2 md:mb-3 lg:mb-3.5">
                    {t(`${title}`)}
                </Text>
                <p className="text-xs leading-6 text-body md:text-sm md:leading-7">{t(`${description}`)}</p>
            </div>
            <div className="mb-2.5 md:mb-0 md:px-20 lg:px-40 xl:mb-2 xl:px-0 2xl:mb-4 3xl:mb-6">
                <Image src={supportImage} alt={t('text-support-thumbnail')} width={870} height={300} />
            </div>
            <Button>
                {t(`${buttonText}`)}
                <IoChatbubbleEllipsesOutline className="ms-2 text-lg md:text-xl" />
            </Button>
        </div>
    );
};

export default Support;
