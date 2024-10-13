'use client';
import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import useBreadcrumb, { convertBreadcrumbTitle } from '@/hooks/use-breadcrumb';
import ActiveLink from '@components/ui/active-link';
import React from 'react';

interface Props {
    children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
    return (
        <li
            className="px-2.5 text-sm text-body transition duration-200 ease-in hover:text-heading ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0"
            {...props}
        >
            {children}
        </li>
    );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
    return (
        <li className="mt-0.5 text-base text-body" {...props}>
            {children}
        </li>
    );
};

export const BreadcrumbItems = (props: any) => {
    let children: any = React.Children.toArray(props.children);

    children = children.map((child: string, index: number) => (
        <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
    ));

    const lastIndex = children.length - 1;

    children = children.reduce((acc: any, child: string, index: number) => {
        const notLast = index < lastIndex;

        if (notLast) {
            acc.push(
                child,
                <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>{props.separator}</BreadcrumbSeparator>
            );
        } else {
            acc.push(child);
        }
        return acc;
    }, []);

    return (
        <div className="CoolPCBreadcrumb flex items-center">
            <ol className="flex w-full items-center overflow-hidden">{children}</ol>
        </div>
    );
};

const Breadcrumb: React.FC<{ separator?: string }> = ({ separator = '/' }) => {
    const breadcrumbs = useBreadcrumb();
    const t = useTranslationsCommon();

    return (
        <BreadcrumbItems separator={separator}>
            <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                <div>{t('breadcrumb-home')}</div>
            </ActiveLink>

            {breadcrumbs?.map((breadcrumb: any) => (
                <ActiveLink href={breadcrumb.href} activeClassName="font-semibold text-heading" key={breadcrumb.href}>
                    <div className="capitalize">{convertBreadcrumbTitle(breadcrumb.breadcrumb)}</div>
                </ActiveLink>
            ))}
        </BreadcrumbItems>
    );
};

export default Breadcrumb;
