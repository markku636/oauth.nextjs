'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Text from '@components/ui/text';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const data = {
    title: 'common:text-subscribe-heading',
    description: 'common:text-subscribe-description',
    buttonText: 'common:button-subscribe',
};

interface Props {
    className?: string;
}

type FormValues = {
    subscription_email: string;
};

const defaultValues = {
    subscription_email: '',
};

const SubscriptionWithBg: React.FC<Props> = ({ className = 'px-5 sm:px-8 md:px-16 2xl:px-24' }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,
    });
    const { locale } = useRouter();
    const dir = getDirection(locale);
    const t = useTranslationsCommon();
    const { title, description, buttonText } = data;

    async function onSubmit(input: FormValues) {
        console.log(input, 'data');
    }
    return (
        <div
            className={`${className} relative flex flex-col overflow-hidden rounded-lg bg-gray-200 py-10 sm:items-center md:py-14 lg:py-16 xl:items-start`}
        >
            <div className="-mt-1.5 mb-7 text-center md:mb-8 lg:-mt-2 lg:mb-9 xl:-mt-0.5 xl:mb-0 ltr:xl:text-left rtl:xl:text-right">
                <Text variant="mediumHeading" className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5">
                    {t(`${title}`)}
                </Text>
                <p className="text-xs leading-6 text-body md:text-sm md:leading-7">{t(`${description}`)}</p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="z-10 w-full flex-shrink-0 sm:w-96 md:mt-7 md:w-[545px]"
                noValidate
            >
                <div className="flex flex-col items-start justify-end sm:flex-row">
                    <Input
                        placeholderKey="forms:placeholder-email-subscribe"
                        type="email"
                        variant="solid"
                        className="w-full"
                        inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center ltr:sm:text-left rtl:sm:text-right bg-white"
                        {...register('subscription_email', {
                            required: 'forms:email-required',
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'forms:email-error',
                            },
                        })}
                        errorKey={errors.subscription_email?.message}
                    />
                    <Button className="mt-3 w-full flex-shrink-0 sm:mt-0 sm:w-auto ltr:sm:ml-2 rtl:sm:mr-2 md:h-full">
                        <span className="lg:py-0.5">{t(`${buttonText}`)}</span>
                    </Button>
                </div>
            </form>
            <div
                style={{
                    backgroundImage:
                        dir === 'rtl'
                            ? 'url(/assets/images/subscription-bg-reverse.png)'
                            : 'url(/assets/images/subscription-bg.png)',
                }}
                className={`z-0 hidden bg-no-repeat xl:block ${
                    dir === 'rtl'
                        ? 'bg-left 2xl:-left-12 3xl:left-0'
                        : 'bg-right xl:-right-24 2xl:-right-20 3xl:right-0'
                } absolute top-0 h-full w-full bg-contain xl:bg-cover 3xl:bg-contain`}
            />
        </div>
    );
};

export default SubscriptionWithBg;
