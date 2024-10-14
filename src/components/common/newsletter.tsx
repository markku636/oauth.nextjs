'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { useAppDispatch } from '@/redux/reducer/hooks';
import { closeModal } from '@/redux/reducer/ui/ui-slice';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

interface NewsLetterFormValues {
    email: string;
}
const defaultValues = {
    email: '',
};

export default function Newsletter() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewsLetterFormValues>({
        defaultValues,
    });

    const dispatch = useAppDispatch();
    // const { closeModal } = useUI();

    function onSubmit(values: NewsLetterFormValues) {
        console.log(values, 'news letter');
        dispatch(closeModal());
    }
    const t = useTranslationsCommon();

    return (
        <div className="flex items-center justify-center">
            <div className="flex max-h-full w-full max-w-full flex-col overflow-hidden rounded-md bg-white sm:w-[450px] md:w-[550px] lg:w-[980px] xl:w-[1170px]">
                <div className="flex items-center">
                    <div className="hidden flex-shrink-0 items-center justify-center bg-gray-200 lg:flex lg:w-[520px] xl:w-auto">
                        <Image
                            src="/assets/images/newsletter.jpg"
                            alt="Thumbnail"
                            width={655}
                            height={655}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex w-full flex-col px-5 py-7 text-center sm:p-10 md:p-12 xl:p-14">
                        <h4 className="mb-2 text-xs font-semibold uppercase text-body sm:text-sm lg:mb-4">
                            {t('common:text-subscribe-now')}
                        </h4>
                        <h2 className="mb-5 text-lg font-bold leading-8 text-heading sm:mb-7 sm:text-xl md:mb-9 md:text-2xl">
                            {t('common:text-newsletter-title')}
                        </h2>
                        <p className="text-sm leading-6 text-body md:leading-7">
                            {t('common:text-newsletter-subtitle')}
                        </p>
                        <form className="mb-1 pt-8 sm:mb-0 sm:pt-10 md:pt-14" onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                placeholderKey="forms:placeholder-email-subscribe"
                                type="email"
                                variant="solid"
                                className="w-full"
                                inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center bg-gray-50"
                                {...register('email', {
                                    required: 'forms:email-required',
                                    pattern: {
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'forms:email-error',
                                    },
                                })}
                                errorKey={errors.email?.message}
                            />
                            <Button className="mt-3 h-12 w-full sm:mt-4 lg:h-14">{t('common:button-subscribe')}</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
