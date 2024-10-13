import cn from '@utils/classname/cn';

type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export default function Arrow({ direction = 'up' }: { direction: ArrowDirection }) {
    const getRotateClassName = (direction: ArrowDirection) => {
        switch (direction) {
            case 'up':
                return 'rotate-45 bottom-0.5';
            case 'down':
                return 'rotate-[225deg] top-0.5';
            case 'left':
                return 'rotate-[135deg]';
            case 'right':
                return '-rotate-45';
            default:
                return 'rotate-45';
        }
    };

    return (
        <div
            className={cn(
                'relative w-2 h-2 border-2 border-solid border-[#6a6a6a] border-t-0 border-l-0',
                getRotateClassName(direction)
            )}
        />
    );
}
