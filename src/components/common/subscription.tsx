'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Text from '@components/ui/text';
import { useForm } from 'react-hook-form';

const data = {
    title: 'common:text-subscribe-heading',
    description: 'common:text-subscribe-description',
    buttonText: 'common:button-subscribe',
};

interface Props {
    className?: string;
    disableBorderRadius?: boolean;
}

type FormValues = {
    subscription_email: string;
};

const defaultValues = {
    subscription_email: '',
};

const Subscription: React.FC<Props> = ({
    className = 'px-5 sm:px-8 md:px-16 2xl:px-24',
    disableBorderRadius = false,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,
    });
    const t = useTranslationsCommon();
    const { title, description, buttonText } = data;

    async function onSubmit(input: FormValues) {
        console.log(input, 'data');
    }
    return (
        <div
            className={`${className} flex flex-col items-center justify-center rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16 xl:flex-row xl:justify-between`}
        >
            <div className="mb-7 text-center md:mb-8 lg:-mt-2 lg:mb-9 xl:-mt-0.5 xl:mb-0 ltr:xl:text-left rtl:xl:text-right">
                <Text
                    variant="mediumHeading"
                    // className='mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5'
                    className="sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5"
                >
                    {t(`${title}`)}
                </Text>
                <p className="text-xs leading-6 text-body md:text-sm md:leading-7">{t(`${description}`)}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-shrink-0 sm:w-96 md:w-[545px]" noValidate>
                <div className="flex flex-col items-start justify-end sm:flex-row">
                    <Input
                        disableBorderRadius={disableBorderRadius}
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
                    <Button
                        disableBorderRadius={disableBorderRadius}
                        className="mt-3 w-full flex-shrink-0 sm:mt-0 sm:w-auto ltr:sm:ml-2 rtl:sm:mr-2 md:h-full"
                    >
                        <span className="lg:py-0.5">{t(`${buttonText}`)}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Subscription;
