import Spinner from '@components/ui/loaders/spinner';
import cn from '@utils/classname/cn';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'red' | 'white' | 'outline-black' | 'outline-white';
    padding?: string;
    fullWidth?: boolean;
    hover?: boolean;
    active?: boolean;
    loading?: boolean;
}

export default function CustomButton(props: Readonly<Props>) {
    const {
        className = '',
        variant = 'red',
        padding = 'px-8 py-2.5',
        fullWidth = false,
        hover = true,
        active,
        loading = false,
        disabled = false,
        children,
        ...rest
    } = props;

    return (
        <button
            className={cn(
                'rounded-full flex items-center justify-center transition duration-300 ease-in-out',
                padding,
                // variant
                {
                    'bg-red-coolpc text-white': variant === 'red',
                    'text-black bg-white border border-solid border-black-coolpc': variant === 'white',
                    'text-black-coolpc border border-solid border-black-coolpc': variant === 'outline-black',
                    'text-white border border-white': variant === 'outline-white',
                },
                // hover
                {
                    'hover:bg-red-coolpcHover': hover && variant === 'red',
                    'hover:bg-black-coolpc hover:text-white hover:border-black-coolpc':
                        hover && (variant === 'white' || variant === 'outline-black'),
                    'hover:bg-white hover:text-black-coolpc': hover && variant === 'outline-white',
                },
                {
                    'w-full': fullWidth,
                    'cursor-not-allowed': loading,
                    'cursor-not-allowed hover:cursor-not-allowed': disabled,
                },
                className
            )}
            aria-pressed={active}
            data-variant={variant}
            disabled={disabled || loading}
            {...rest}
        >
            {loading && <Spinner className="mr-2" color={variant === 'red' ? 'white' : 'black'} />}
            {children}
        </button>
    );
}
