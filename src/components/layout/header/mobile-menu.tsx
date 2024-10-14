'use client';
import { useAppDispatch } from '@/redux/reducer/hooks';
import { closeSidebar } from '@/redux/reducer/ui/ui-slice';
import Scrollbar from '@components/common/scrollbar';
import Link from '@components/ui/link';
import Logo from '@components/ui/logo';
import { siteSettings } from '@settings/site-settings';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoClose, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';

const social = [
    {
        id: 0,
        link: 'https://www.facebook.com/redqinc/',
        icon: <IoLogoFacebook />,
        className: 'facebook',
        title: 'text-facebook',
    },
    {
        id: 1,
        link: 'https://twitter.com/redqinc',
        icon: <IoLogoTwitter />,
        className: 'twitter',
        title: 'text-twitter',
    },
    {
        id: 2,
        link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
        icon: <IoLogoYoutube />,
        className: 'youtube',
        title: 'text-youtube',
    },
    {
        id: 3,
        link: 'https://www.instagram.com/redqinc/',
        icon: <IoLogoInstagram />,
        className: 'instagram',
        title: 'text-instagram',
    },
];

export default function MobileMenu() {
    const [activeMenus, setActiveMenus] = useState<any>([]);
    const { site_header } = siteSettings;

    const dispatch = useAppDispatch();

    const t = useTranslations('menu');
    const handleArrowClick = (menuName: string) => {
        const newActiveMenus = [...activeMenus];

        if (newActiveMenus.includes(menuName)) {
            const index = newActiveMenus.indexOf(menuName);

            if (index > -1) {
                newActiveMenus.splice(index, 1);
            }
        } else {
            newActiveMenus.push(menuName);
        }

        setActiveMenus(newActiveMenus);
    };

    const ListMenu = ({ dept, data, hasSubMenu, menuName, menuIndex, className = '' }: any) =>
        data.label && (
            <li className={`mb-0.5 ${className}`}>
                <div className="relative flex items-center justify-between">
                    <Link
                        href={data.path}
                        className="menu-item relative w-full py-3 text-[15px] transition duration-300 ease-in-out ltr:pl-5 ltr:pr-4 rtl:pl-4 rtl:pr-5 ltr:md:pl-6 rtl:md:pr-6"
                    >
                        <span className="block w-full" onClick={() => dispatch(closeSidebar())}>
                            {t(`${data.label}`)}
                        </span>
                    </Link>
                    {hasSubMenu && (
                        <div
                            className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-end text-lg ltr:left-0 ltr:pr-5 rtl:right-0 rtl:pl-5"
                            onClick={() => handleArrowClick(menuName)}
                        >
                            <IoIosArrowDown
                                className={`transform text-heading transition duration-200 ease-in-out ${
                                    activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                                }`}
                            />
                        </div>
                    )}
                </div>
                {hasSubMenu && (
                    <SubMenu
                        dept={dept}
                        data={data.subMenu}
                        toggle={activeMenus.includes(menuName)}
                        menuIndex={menuIndex}
                    />
                )}
            </li>
        );

    const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
        if (!toggle) {
            return null;
        }

        dept = dept + 1;

        return (
            <ul className="pt-0.5">
                {data?.map((menu: any, index: number) => {
                    const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

                    return (
                        <ListMenu
                            dept={dept}
                            data={menu}
                            hasSubMenu={menu.subMenu}
                            menuName={menuName}
                            key={menuName}
                            menuIndex={index}
                            className={dept > 1 && 'ltr:pl-4 rtl:pr-4'}
                        />
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="flex h-full w-full flex-col justify-between">
            <div className="relative flex w-full flex-shrink-0 items-center justify-between border-b border-gray-100 py-0.5 ltr:pl-5 rtl:pr-5 ltr:md:pl-7 rtl:md:pr-7">
                <Logo />

                <button
                    className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity hover:opacity-60 focus:outline-none md:px-6 lg:py-8"
                    onClick={() => dispatch(closeSidebar())}
                    aria-label="close"
                >
                    <IoClose className="mt-1 text-black md:mt-0.5" />
                </button>
            </div>

            <Scrollbar className="menu-scrollbar mb-auto flex-grow">
                <div className="flex flex-col px-0 py-7 text-heading lg:px-2">
                    <ul className="mobileMenu">
                        {site_header.mobileMenu.map((menu, index) => {
                            const dept = 1;
                            const menuName = `sidebar-menu-${dept}-${index}`;

                            return (
                                <ListMenu
                                    dept={dept}
                                    data={menu}
                                    hasSubMenu={menu.subMenu}
                                    menuName={menuName}
                                    key={menuName}
                                    menuIndex={index}
                                />
                            );
                        })}
                    </ul>
                </div>
            </Scrollbar>

            <div className="flex flex-shrink-0 items-center justify-center gap-x-1 border-t border-gray-100 bg-white px-7">
                {social?.map((item, index) => (
                    <div
                        href={item.link}
                        className={`p-5 text-heading opacity-60 transition duration-300 ease-in hover:opacity-100 ltr:first:-ml-4 rtl:first:-mr-4 ${item.className}`}
                        target="_blank"
                        key={index}
                    >
                        <span className="sr-only">{t(`${item.title}`)}</span>
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
}
