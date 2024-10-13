import Link from '@components/ui/link';
import { siteSettings } from '@settings/site-settings';
import cn from 'classnames';
import Image from 'next/image';
import { AnchorHTMLAttributes, FC } from 'react';

const Logo: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, ...props }) => {
    return (
        <Link href={siteSettings.logo.href} className={cn('inline-flex focus:outline-none', className)} {...props}>
            <Image
                src={siteSettings.logo.url}
                alt={siteSettings.logo.alt}
                height={siteSettings.logo.height}
                width={siteSettings.logo.width}
                priority
            />
        </Link>
    );
};

export default Logo;
