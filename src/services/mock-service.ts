import { ILayout } from '@/typing/layout';

export async function fetchLayout(): Promise<ILayout> {
    const res: any = {
        id: 1,
        createdAt: '2024-01-03T05:23:18.949Z',
        updatedAt: '2024-07-23T02:59:52.889Z',
        locale: 'en',
        footer: {
            id: 1,
            copyright: {
                id: 1,
                textLang: 'footer-copyright',
                informations: [
                    { id: 16, href: '/terms', labelLang: 'footer-copyright-info-terms', target: null },
                    { id: 17, href: '/privacy', labelLang: 'footer-copyright-info-privacy', target: null },
                ],
            },
        },
        header: {
            id: 1,
            menu: [{ id: 4, titleLang: 'login', link: '/login' }],
            languageMenu: [
                { id: 1, nameLang: 'language-menu-de', value: 'de' },
                { id: 2, nameLang: 'language-menu-en', value: 'en' },
            ],
            accountDropdown: {
                id: 1,
                orderStatusTextLang: 'account-dropdown-order-status-text',
                signOutGuestTextLang: 'account-dropdown-logout-text',
            },
        },
        contacts: [
            { id: 1, textLang: 'contacts-customer-service', contactNumber: null },
            { id: 2, textLang: 'contacts-technical-support', contactNumber: null },
        ],
        localizations: [],
    };

    return await res;
}
