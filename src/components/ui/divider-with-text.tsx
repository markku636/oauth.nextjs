import cn from '@utils/classname/cn';

interface DividerProps {
    text: string;
    classNames?: string;
}

export default function DividerWithText({ text = '', classNames = '' }: Readonly<DividerProps>) {
    return (
        <div className={cn('flex w-full items-center', classNames)}>
            <div className="h-1 w-full border-t border-gray-300"></div>
            <p className="px-4 text-center whitespace-nowrap">{text}</p>
            <div className="h-1 w-full border-t border-gray-300"></div>
        </div>
    );
}
