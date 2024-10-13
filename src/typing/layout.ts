import { ReactNode } from 'react';
import { StrapiImageObject } from './strapi-object';

export interface ILayout {
    header: IHeader;
    footer: IFooter;
    socialNetWorks: ISocialNewWork[];
    contacts: IContact[];
}

// Header
export interface IHeader {
    menu: IMenu[];
    languageMenu: ILanguageMenu[];
    accountDropdown: IAccountDropdown;
}
export interface IContact {
    id: number;
    textLang: string;
    contactNumber: string;
}

export interface IMenu {
    id: number;
    titleLang: string;
    link: string;
}

export interface ISubMenu {
    id: number;
    titleLang: string;
    descLang: string;
    link: string;
}

export interface ILanguageMenu {
    id: number;
    nameLang: string;
    value: string;
}

export interface IAccountDropdown {
    orderStatusTextLang: string;
    signOutGuestTextLang: string;
}

// Footer
export interface IFooter {
    footerColumns: IFooterColumn[];
    cooperations: ICooperation[];
    copyright: ICopyright;
    aboutIBP: IAboutIBP[];
}

export interface ISocialNewWork {
    id: number;
    name: string;
    enLink: string;
    deLink: string;
}

export interface IFooterColumn {
    id: number;
    titleLink: string;
    titleLang: string;
    links: IFooterColumnLink[];
}

export interface IFooterColumnLink {
    id: number;
    href: string;
    target: string;
    labelLang: string;
}

export interface ICooperation {
    id: number;
    titleLang: string;
    buttonTextLang: string;
    thumbnail: StrapiImageObject;
    popupImg: StrapiImageObject;
}

export interface ICopyright {
    id: number;
    textLang: string;
    informations: ICopyrightInfomation[];
}

export interface ICopyrightInfomation {
    id: number;
    href: string;
    target: string | null;
    labelLang: string;
}

export interface IAboutContent {
    exactMatchPathnames: IPathname[];
    partialMatchPathnames: IPathname[];
    markdown: ReactNode;
}

export interface IAboutIBP {
    id: string;
    contentLang: string; // about content
    exactMatchPathnames: IPathname[];
    partialMatchPathnames: IPathname[];
}

interface IPathname {
    id: number;
    pathname: string;
}
