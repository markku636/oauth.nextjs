import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Link from '@components/ui/link';
import { FC } from 'react';
import { IoCallSharp, IoLocationSharp, IoMail } from 'react-icons/io5';
const mapImage = '/assets/images/map-image.jpg';
const data = [
    {
        id: 1,
        slug: '/',
        icon: <IoLocationSharp />,
        name: 'text-address',
        description: 'text-address-details',
    },
    {
        id: 2,
        slug: '/',
        icon: <IoMail />,
        name: 'text-email',
        description: 'text-email-details',
    },
    {
        id: 3,
        slug: '/',
        icon: <IoCallSharp />,
        name: 'text-phone',
        description: 'text-phone-details',
    },
];
interface Props {
    image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {
    const t = useTranslationsCommon();
    return (
        <div className="mb-6 border-gray-300 lg:rounded-md lg:border lg:p-7">
            <h4 className="-mt-1 pb-7 text-2xl font-bold text-heading md:pb-10 md:text-lg lg:pb-6">
                {t('text-find-us-here')}
            </h4>
            {data?.map((item: any) => (
                <div key={`contact--key${item.id}`} className="flex pb-7">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-300 p-1.5">
                        {item.icon}
                    </div>
                    <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
                        <h5 className="text-sm font-bold text-heading">{t(`${item.name}`)}</h5>
                        <Link href={item.slug} className="mt-0 text-sm">
                            {t(`${item.description}`)}
                        </Link>
                    </div>
                </div>
            ))}
            <img src={mapImage} alt={t('text-map')} className="rounded-md" />
        </div>
    );
};

export default ContactInfoBlock;
