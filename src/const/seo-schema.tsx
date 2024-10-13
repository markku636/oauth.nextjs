import { SITE_LOGO, SITE_NAME, SITE_URL } from '@/metadata-config';
import { IGearModel } from '@/typing/product/gearModel';
import { IStoreModel } from '@/typing/product/storeModel';
import { getAbsoluteImageUrl } from '@utils/image-tool';
import React from 'react';

interface LocaleProps {
    locale: string;
}

const currency = 'EUR';
const schemaOrgUrl = 'https://schema.org/';

const organizationCommonData = {
    '@context': schemaOrgUrl,
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: SITE_NAME,
    parentOrganization: 'American Future Technology',
    numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 200,
        maxValue: 500,
    },
    url: SITE_URL,
    logo: SITE_LOGO,
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bischofstraße 80',
        postalCode: 47809,
        addressLocality: 'Krefeld',
        addressRegion: 'North Rhine-Westphalia',
        addressCountry: 'DE',
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: '+49 2151 5188951',
            contactType: '',
            areaServed: [],
            knowsLanguage: [],
        },
        {
            '@type': 'ContactPoint',
            telephone: '+49 2151 5188955',
            contactType: '',
            areaServed: [],
            knowsLanguage: [],
        },
        {
            '@type': 'ContactPoint',
            telephone: '+49 2151 5188951',
            contactType: '',
            areaServed: [],
            knowsLanguage: [],
        },
        {
            '@type': 'ContactPoint',
            email: 'support@coolpc.de',
            contactType: '',
            areaServed: [],
            knowsLanguage: [],
        },
    ],
    sameAs: [
        'https://www.facebook.com/Cool3CPC/',
        'https://twitter.com/Cool3C',
        'https://www.instagram.com/coolpcpc/',
        'https://www.youtube.com/user/coolpc',
        'https://www.linkedin.com/company/coolpc',
    ],
};

const organizationLangSpecificData = {
    en: {
        contactType: ['Customer Service', 'Technical Support', 'Sales', 'Customer Service'],
        areaServed: [
            {
                '@type': 'Place',
                name: 'Germany',
            },
            {
                '@type': 'Place',
                name: 'Europe',
            },
        ],
        knowsLanguage: [
            {
                '@type': 'Place',
                name: 'German',
            },
            {
                '@type': 'Place',
                name: 'English',
            },
        ],
    },
    de: {
        contactType: ['Kundenservice', 'Technischen Supports', 'Vertriebsöffnungszeiten', 'Kundenservice'],
        areaServed: [
            {
                '@type': 'Place',
                name: 'Deutschland',
            },
            {
                '@type': 'Place',
                name: 'Europa',
            },
        ],
        knowsLanguage: [
            {
                '@type': 'Place',
                name: 'Deutsch',
            },
            {
                '@type': 'Place',
                name: 'Englisch',
            },
        ],
    },
};

const getOrganizationSchema = (locale: string) => {
    const orgData = locale === 'de' ? organizationLangSpecificData.de : organizationLangSpecificData.en;
    const contactPointData = organizationCommonData.contactPoint.map((contact, index) => {
        return {
            ...contact,
            contactType: orgData.contactType[index],
            areaServed: orgData.areaServed,
            knowsLanguage: orgData.knowsLanguage,
        };
    });

    return {
        ...organizationCommonData,
        contactPoint: contactPointData,
    };
};

const website = {
    '@context': schemaOrgUrl,
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_NAME,
    sameAs: ['https://www.facebook.com/cool3cpc'],
};

export const SiteSchema: React.FC<LocaleProps> = ({ locale }) => {
    const organizationSchema = getOrganizationSchema(locale);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            ></script>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}></script>
        </>
    );
};

interface GearProductSchemaProps {
    gearModel: IGearModel;
    desc: string;
    url: string;
}

export const GearProductSchema: React.FC<GearProductSchemaProps> = ({ gearModel, desc, url }) => {
    const isInStock = gearModel.skuList[0].stock > 0 || gearModel.skuList[0].stock === -99;
    const imageUrl = getAbsoluteImageUrl(gearModel.skuList[0].mainPic);

    const schema = {
        '@context': schemaOrgUrl,
        '@type': 'Product',
        name: gearModel.title,
        description: desc,
        image: imageUrl,
        brand: {
            '@type': 'Brand',
            name: 'Cool3C',
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: currency,
            price: gearModel.skuList[0].price.toString(),
            availability: `${isInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}`,
            itemCondition: 'https://schema.org/NewCondition',
            url: url,
        },
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}></script>;
};

interface PCProductSchemaProps {
    model: IStoreModel;
    desc: string;
    url: string;
}

interface PCProductSchemaType {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    image: string;
    brand: {
        '@type': string;
        name: string;
    };
    offers: {
        '@type': string;
        priceCurrency: string;
        price: string;
        availability: string;
        itemCondition: string;
        url: string;
    };
    aggregateRating?: {
        '@type': string;
        ratingValue: number;
        bestRating: number;
        worstRating: number;
        ratingCount: number;
    };
}

export const PCProductSchema: React.FC<PCProductSchemaProps> = ({ model, desc, url }) => {
    const isInStock = model.desc.stock > 0 || model.desc.stock === -99;
    const imageUrl = getAbsoluteImageUrl(model.desc.info.image);

    const schema: PCProductSchemaType = {
        '@context': schemaOrgUrl,
        '@type': 'Product',
        name: model.desc.info.name,
        description: desc,
        image: imageUrl,
        brand: {
            '@type': 'Brand',
            name: 'Cool3C',
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: currency,
            price: model.desc.info.price.toString(),
            availability: `${isInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}`,
            itemCondition: 'https://schema.org/NewCondition',
            url: url,
        },
    };

    if (model.desc.info.reviews > 0) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: model.desc.info.reviewRating,
            bestRating: 5,
            worstRating: 1,
            ratingCount: model.desc.info.reviews,
        };
    }

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}></script>;
};

// The below schema hasn't been updated.
export namespace google_faq {
    const gaming_pcs = {
        '@context': schemaOrgUrl,
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What Is a Gaming PC?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A gaming PC is a computer built with powerful components to elevate the gaming experience. Gaming PCs typically have improved CPU, GPU, RAM, and storage units versus ordinary computers.',
                },
            },
            {
                '@type': 'Question',
                name: 'What Is the Best Gaming PC for My Budget?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We have an extensive range of solutions that sell between $679 to $5,000 for high-performance apparatus. The best gaming PC is the one that meets your needs, so make a list of non-negotiables before purchasing one.',
                },
            },
            {
                '@type': 'Question',
                name: 'What Is the Most Important Component in a Gaming PC?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'While essential components depend on preferences, we recommend following this order: CPU, GPU, RAM, motherboard, and storage.',
                },
            },
            {
                '@type': 'Question',
                name: 'What Is the Best Setup for Gaming?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The best gaming setup is one that matches your style. At Cool3C, we offer customized solutions with the help of the industry’s top brands like MSI, ASUS, EVGA, and more.',
                },
            },
        ],
    };

    const prebuilt_gaming_pcs = {
        '@context': schemaOrgUrl,
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What is a prebuilt PC?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A prebuilt PC is a pre-assembled and packaged desktop with its parts and components QA tested in advance.',
                },
            },
            {
                '@type': 'Question',
                name: 'Is a prebuilt PC right for you?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We recommend prebuilt PCs to those who have little to no experience building a PC, or if you’re in need of a system ASAP.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the primary advantage of going prebuilt over DIY?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Since building a computer from scratch requires thorough knowledge of the latest generation of motherboards, processors, graphics cards, power supplies, cabling, and the many other pieces of hardware that constitute a desktop, customers who go with a prebuilt gaming PC are guaranteed to receive a system whose parts and components are optimized to work together effectively.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the best gaming setup for beginners?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Maybe you’re more a PC gamer than a DIY enthusiast, and prefer to rely on the expertise of a lab team who designs custom PCs or a living?\n\nPerhaps you’re just looking for a prebuilt desktop that can chew up ultra settings with an NVIDIA GeForce RTX 2080 Ti GPU and an Intel 9th Gen CPU?\n\nOr maybe you’re looking for a more affordable gaming pc without sacrificing performance?\n\nOur weekly prebuilt pc deals will help you find the best gaming pc under 1000, as well as the best gaming desktops packed with top tier pc parts.',
                },
            },
        ],
    };

    export const google_faq_map: { [key: string]: JSX.Element } = {
        '/gaming-pcs': (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(gaming_pcs) }}
            ></script>
        ),
        '/gaming-pcs/prebuilt-gaming-pcs': (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(prebuilt_gaming_pcs) }}
            ></script>
        ),
    };
}

export const breadcrumbSchema = (pathName: string[]) => {
    const itemListElement = [] as any;

    pathName.map((path: string, key: number) => {
        const to = `/${pathName.slice(0, key + 1).join('/')}`.replaceAll('//', '/');
        const name = path === '' ? 'home' : path.split('?')[0].replaceAll('-', ' ');

        itemListElement.push({
            '@type': 'ListItem',
            position: key + 1,
            name: name,
            item: `https://www.coolpc.com${to}`,
        });
    });

    const schema = {
        '@context': schemaOrgUrl,
        '@type': 'BreadcrumbList',
        itemListElement: itemListElement,
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}></script>;
};

export const faqSchema = (faqItems: any): JsonLdSchema => {
    function removeTags(str: string) {
        return str.replace(/<\/?p>|[\r\n\t]/g, '').replace(/<\/p>/g, '');
    }

    const schemaQA: any = [];

    faqItems.forEach((item: any) =>
        item.QuestionItems.forEach((question: any) => {
            schemaQA.push({
                '@type': 'Question',
                name: question.Title,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: removeTags(question.Body),
                },
            });
        })
    );

    const schema = {
        '@context': schemaOrgUrl,
        '@type': 'FAQPage',
        mainEntity: schemaQA,
    };

    return schema;
};

interface JsonLdSchema {
    '@context': string;
    '@type': string;
    mainEntity?: IMainEntity[];
}

interface IMainEntity {
    '@type': string;
    name: string;
    acceptedAnswer: {
        '@type': string;
        text: string;
    };
}
