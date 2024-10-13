'use client';
import { CloudflareTurnstileNames } from '@/const/keys';

import { LoginParams } from '@/typing/api/auth-api-type';
import CustomButton from '@components/ui/button/custom-button';
import DividerWithText from '@components/ui/divider-with-text';
import ErrorMessage from '@components/ui/error-message';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function Page() {
    const t = useTranslations('common');
    const isLoading = false;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginParams>();

    const onSubmit = async ({ email, password }: LoginParams) => {};

    const handleGuestLogin = async () => {};

    const errorMessage: any = null;

    return (
        <>
            <div className="flex flex-col items-center w-full sm:max-w-[360px] mt-6 lg:mt-24 px-8 sm:px-0 mx-auto max-w-[1580px]">
                <h1 className="font-bold w-fit">{t('login-signin')}</h1>

                <CustomButton fullWidth className="mt-6 lg:mt-10" disabled={isLoading} onClick={handleGuestLogin}>
                    {!isLoading ? t('login-jkopay-login') : t('button-loading')}
                </CustomButton>
                <DividerWithText text="OR" classNames="py-8" />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                    <div className="flex flex-col gap-3">
                        <Input
                            {...register('email', {
                                required: 'error-message-field-required',
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'error-message-invalid-email',
                                },
                            })}
                            placeholderKey="text-email"
                            variant="solid"
                            className="w-full"
                            errorKey={errors.email?.message}
                        />
                        <PasswordInput
                            {...register('password', {
                                required: 'error-message-field-required',
                            })}
                            placeholderKey="form-input-password"
                            errorKey={errors.password?.message}
                        />
                    </div>

                    <div id={CloudflareTurnstileNames.login.containerId} className="flex justify-center py-4"></div>
                    <CustomButton variant="outline-black" disabled={isLoading}>
                        {!isLoading ? t('login-signin') : t('button-loading')}
                    </CustomButton>
                    <ErrorMessage messageKey={errorMessage} />
                </form>
            </div>
        </>
    );
}
