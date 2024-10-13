import { useTranslationsCommon } from '@/hooks/translations/use-translation-hooks';
import { IMenu } from '@/typing/layout';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface ISubMenuProps {
    menu: IMenu[];
    menuTitle: string;
    toggleModal: boolean;
    triggerClose: () => void;
}

export default function SubMenu({ menu, menuTitle, toggleModal, triggerClose }: ISubMenuProps) {
    const t = useTranslationsCommon();

    // TODO: displaySubMenu && open, closeSubMenu

    return (
        <>
            {menu.map(
                (item) =>
                    item.subMenu.length > 0 && (
                        <div
                            key={item.id}
                            className={cn('absolute top-[105px] z-10 mx-auto flex w-fit', {
                                hidden: menuTitle !== item.titleLang,
                            })}
                        >
                            <div className="grid h-[385px] grid-flow-col grid-rows-3 gap-2 bg-white p-6">
                                {item.subMenu.map((menu) => (
                                    <Link
                                        key={menu.id}
                                        href={menu.link}
                                        className="flex w-[240px] flex-col items-start justify-center text-sm hover:text-red-600"
                                    >
                                        <h4 className="font-bold">{t(menu.titleLang)}</h4>
                                        <p className="mt-2">{t(menu.descLang)}</p>
                                    </Link>
                                ))}
                            </div>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CDN_CONTENT_URL}${item.imageUrl}`}
                                alt=""
                                sizes="100vw"
                                width={485}
                                height={385}
                            />
                        </div>
                    )
            )}
            <div
                className={cn('fixed left-0 top-[105px] h-screen w-screen bg-black/[0.3]', { hidden: !toggleModal })}
                onClick={triggerClose}
            />
        </>
    );
}
