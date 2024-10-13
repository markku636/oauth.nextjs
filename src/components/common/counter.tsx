'use client';
import MinusIcon from '@components/icons/minus-icon';
import PlusIcon from '@components/icons/plus-icon';
import cn from 'classnames';
import { FC } from 'react';
type CounterProps = {
    quantity: number;
    onDecrement: (e: any) => void;
    onIncrement: (e: any) => void;
    disableIncrement?: boolean;
    disableDecrement?: boolean;
    variant?: 'default' | 'dark';
    className?: string;
};
const Counter: FC<CounterProps> = ({
    quantity,
    onDecrement,
    onIncrement,
    disableIncrement = false,
    disableDecrement = false,
    variant = 'default',
}) => {
    const size = variant !== 'dark' ? '12px' : '10px';

    return (
        <div
            className={cn('group flex flex-shrink-0 items-center justify-between overflow-hidden rounded-md', {
                'h-11 border border-gray-300 md:h-12': variant === 'default',
                'h-8 bg-heading shadow-navigation md:h-9': variant === 'dark',
            })}
        >
            <button
                onClick={onDecrement}
                className={cn(
                    'flex h-full flex-shrink-0 items-center justify-center transition duration-300 ease-in-out focus:outline-none',
                    {
                        'w-10 border-e border-gray-300 text-heading hover:bg-heading hover:text-white md:w-12':
                            variant === 'default',
                        'w-8 bg-heading text-white hover:bg-gray-600 focus:outline-none md:w-9': variant === 'dark',
                    }
                )}
                disabled={disableDecrement}
            >
                <MinusIcon width={size} />
            </button>
            <span
                className={cn(
                    'duration-250 flex h-full flex-shrink-0 cursor-default  items-center justify-center font-semibold transition-colors ease-in-out',
                    {
                        'w-12 text-base text-heading  md:w-20 xl:w-24': variant === 'default',
                        'w-8 text-sm text-white md:w-10 ': variant === 'dark',
                    }
                )}
            >
                {quantity}
            </span>
            <button
                onClick={onIncrement}
                className={cn(
                    'flex h-full flex-shrink-0 items-center justify-center transition duration-300 ease-in-out focus:outline-none',
                    {
                        'w-10 border-s border-gray-300 text-heading hover:bg-heading hover:text-white md:w-12':
                            variant === 'default',
                        'w-8 bg-heading text-white hover:bg-gray-600 focus:outline-none md:w-9': variant === 'dark',
                    }
                )}
                disabled={disableIncrement}
            >
                <PlusIcon width={size} height={size} />
            </button>
        </div>
    );
};

export default Counter;
