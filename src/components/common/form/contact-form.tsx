'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { useForm } from 'react-hook-form';

interface ContactFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormValues>();

    function onSubmit(values: ContactFormValues) {
        console.log(values, 'contact');
    }
    const t = useTranslationsCommon();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col justify-center " noValidate>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-5 md:flex-row md:space-y-0">
                    <Input
                        labelKey="forms:label-name-required"
                        placeholderKey="forms:placeholder-name"
                        {...register('name', { required: 'forms:name-required' })}
                        className="w-full md:w-1/2 "
                        errorKey={errors.name?.message}
                        variant="solid"
                    />
                    <Input
                        labelKey="forms:label-email-required"
                        type="email"
                        placeholderKey="forms:placeholder-email"
                        {...register('email', {
                            required: 'forms:email-required',
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'forms:email-error',
                            },
                        })}
                        className="mt-2 w-full md:mt-0 md:w-1/2 ltr:md:ml-2.5 rtl:md:mr-2.5 ltr:lg:ml-5 rtl:lg:mr-5"
                        errorKey={errors.email?.message}
                        variant="solid"
                    />
                </div>
                <Input
                    labelKey="forms:label-subject"
                    {...register('subject', { required: 'forms:name-subject' })}
                    className="relative"
                    placeholderKey="forms:placeholder-subject"
                    errorKey={errors.subject?.message}
                    variant="solid"
                />
                <TextArea
                    labelKey="forms:label-message"
                    {...register('message')}
                    className="relative mb-4"
                    placeholderKey="forms:placeholder-message"
                />
                <div className="relative">
                    <Button type="submit" className="mt-1 h-12 w-full text-sm sm:w-auto lg:h-14 lg:text-base">
                        {t('common:button-send-message')}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
