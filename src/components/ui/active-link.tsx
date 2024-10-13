'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Children } from 'react';

const ActiveLink = ({ children, activeClassName, href, ...props }: any) => {
  const pathname = usePathname();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className = pathname === href ? `${childClassName} ${activeClassName}`.trim() : childClassName;

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
