import cn from 'classnames';
import { ComponentType, FC, HTMLAttributes } from 'react';
interface Props {
    className?: string;
    children?: any;
    el?: HTMLElement;
    clean?: boolean;
}

const CustomContainer: FC<Props> = ({ children, className, el = 'div', clean }) => {
    const rootClassName = cn(className, {
        'mx-auto max-w-[1580px] px-4 md:px-10': !clean,
    });

    const Component: ComponentType<HTMLAttributes<HTMLDivElement>> = el as any;

    return <Component className={rootClassName}>{children}</Component>;
};

export default CustomContainer;
