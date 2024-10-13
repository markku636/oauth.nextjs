'use client';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import Link from './link';
import MegaMenu from './mega-menu';

const ListMenu = ({ dept, data, hasSubMenu, hasMegaMenu, hasBrands, hasBanners, menuIndex }: any) => {
    const t = useTranslations('menu');

    return (
        <li className={cn(!hasMegaMenu ? 'group relative' : '')}>
            <Link
                href={data.path}
                className="flex items-center py-2 hover:bg-gray-300 hover:text-heading ltr:pl-5 ltr:pr-3 rtl:pl-3 rtl:pr-5 ltr:xl:pl-7 ltr:xl:pr-3.5 rtl:xl:pl-3.5 rtl:xl:pr-7"
            >
                {data.icon && <span className="inline-flex ltr:mr-2 rtl:ml-2">{data.icon}</span>}
                {t(data.label)}
                {data.subMenu && (
                    <span className="mt-0.5 shrink-0 text-sm ltr:ml-auto rtl:mr-auto">
                        <IoIosArrowForward className="text-body transition duration-300 ease-in-out group-hover:text-black" />
                    </span>
                )}
            </Link>
            {hasSubMenu && <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />}
            {(hasMegaMenu || hasBrands || hasBanners) && (
                <div className="categoryMegaMenu absolute flex w-[630px] bg-white shadow-header ltr:left-full rtl:right-full xl:w-[1000px] 2xl:w-[1200px]">
                    <div className="flex-shrink-0">
                        <MegaMenu columns={hasMegaMenu} />
                    </div>
                    <div className="hidden xl:block">
                        <div className="grid grid-cols-3 justify-items-center gap-3 p-6 2xl:px-7 2xl:py-8 3xl:grid-cols-3">
                            {hasBrands.map((brand: any) => (
                                <Link
                                    href={brand.path}
                                    key={brand.id}
                                    className="rounded-md border border-gray-300 bg-gray-200"
                                >
                                    <Image src={brand.icon.src} height={60} width={150} alt={brand.label} />
                                </Link>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3 border-t border-gray-300 p-6 2xl:px-7 2xl:py-8 ">
                            {hasBanners.map((banner: any) => (
                                <Link href={banner.path} key={banner.id}>
                                    <img className="" src={banner.image.src} alt={banner.label} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
    dept = dept + 1;
    return (
        <ul className="subMenuChild invisible absolute top-4 z-0 w-56 bg-gray-200 py-3 opacity-0 shadow-subMenu ltr:right-full rtl:left-full ltr:2xl:left-full ltr:2xl:right-auto rtl:2xl:left-auto rtl:2xl:right-full">
            {data?.map((menu: any, index: number) => {
                const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

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
    );
};

export default ListMenu;
