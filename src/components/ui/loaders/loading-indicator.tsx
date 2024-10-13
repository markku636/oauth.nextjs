import cn from '@utils/classname/cn';
import { HTMLAttributes } from 'react';
import Spinner from './spinner';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function LoadingIndicator({ className, ...props }: Props) {
    return (
        <div className={cn('flex justify-center w-full', className)} {...props}>
            <Spinner className="w-6 h-6" color="black" />
        </div>
    );
}
