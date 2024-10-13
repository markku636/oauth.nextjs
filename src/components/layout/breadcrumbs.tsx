'use client';

import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import CustomContainer from '@components/ui/custom-container';
import cn from '@utils/classname/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
    name: string;
    link: string;
}

const generateBreadcrumbs = (pathSegments: string[]): Breadcrumb[] => {
    let curPath = '';
    const breadcrumbs: Breadcrumb[] = [];

    pathSegments.forEach((name) => {
        curPath += `/${name}`;
        breadcrumbs.push({
            name: name.replace(/-/g, ' '),
            link: curPath,
        });
    });

    return breadcrumbs;
};

export default function BreadCrumbs() {
    const t = useTranslationsCommon();
    const pathname = usePathname();

    const pathSegments = pathname
        ? pathname
              .split('/')
              .filter((crumb) => crumb !== '')
              .slice(1)
        : [];

    const breadcrumbs = generateBreadcrumbs(pathSegments);
    const separator = '>';

    return (
        <div className="border-b">
            <CustomContainer className="flex p-2 text-xs gap-x-2">
                <Link className="text-gray-coolpcText" href={'/'}>
                    {t('breadcrumb-home')}
                </Link>
                {breadcrumbs.map(({ name, link }, index) => (
                    <span key={name} className="flex gap-x-2">
                        <span>{separator}</span>
                        <Link
                            className={cn({
                                'text-gray-coolpcText': index !== breadcrumbs.length - 1,
                                // 'font-bold': index === breadcrumbs.length - 1,
                            })}
                            href={link}
                        >
                            {name}
                        </Link>
                    </span>
                ))}
            </CustomContainer>
        </div>
    );
}
