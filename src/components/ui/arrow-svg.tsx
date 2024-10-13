import cn from '@utils/classname/cn';

export function ArrowSvg({ className = '' }: Readonly<{ className?: string }>) {
    return (
        <svg
            version="1.1"
            className={cn('arrow inline', className)}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 24.4 20.5"
            xmlSpace="preserve"
        >
            <g id="Path_52">
                <path
                    className="st0"
                    d="M19.2,14.8c-0.3,0-0.5-0.1-0.7-0.3l-6.6-6.9l-6.6,6.9c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l7.4-7.7
c0.2-0.2,0.4-0.3,0.7-0.3l0,0c0.3,0,0.5,0.1,0.7,0.3l7.4,7.7c0.4,0.4,0.4,1,0,1.4C19.7,14.7,19.4,14.8,19.2,14.8z"
                />
            </g>
        </svg>
    );
}
