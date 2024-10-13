'use client';
import Container from '@components/ui/container';
import PageHeader from '@components/ui/page-header';
import { termsAndServices } from '@settings/terms-settings';
import { Element, Link } from 'react-scroll';

import { useTranslations } from 'next-intl';

function makeTitleToDOMId(title: string) {
    return title.toLowerCase().split(' ').join('_');
}

export default function TermsPage() {
    const t = useTranslations('terms');

    return (
        <>
            <PageHeader pageHeader="text-page-terms-of-service" />
            <div className="mt-12 border-b border-gray-300 px-4 pb-9 md:px-10 md:pb-14 lg:mt-14 lg:px-7 lg:py-1 lg:pb-16 xl:mt-16 xl:px-16 xl:py-0 2xl:px-24 2xl:pb-20 3xl:px-32 3xl:pb-24">
                <Container>
                    <div className="flex flex-col md:flex-row">
                        <nav className="mb-8 md:mb-0 md:w-72 xl:w-3/12">
                            <ol className="sticky z-10 md:top-16 lg:top-28">
                                {termsAndServices?.map((item, index) => (
                                    <li key={item.id}>
                                        <Link
                                            spy={true}
                                            offset={-120}
                                            smooth={true}
                                            duration={500}
                                            to={makeTitleToDOMId(item.title)}
                                            activeClass="text-heading font-semibold"
                                            className="block cursor-pointer py-3 text-sm uppercase text-gray-700  lg:py-3.5 lg:text-base"
                                        >
                                            {(index <= 9 ? '0' : '') + index + ' ' + t(`${item.title}`)}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        {/* End of section scroll spy menu */}

                        <div className="md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 ">
                            {termsAndServices?.map((item) => (
                                // @ts-ignore
                                <Element key={item.title} id={makeTitleToDOMId(item.title)} className="mb-10">
                                    <h2 className="mb-4 text-lg font-bold text-heading md:text-xl lg:text-2xl">
                                        {t(`${item.title}`)}
                                    </h2>
                                    <div
                                        className="text-sm leading-7 text-heading lg:text-base lg:leading-loose"
                                        dangerouslySetInnerHTML={{
                                            __html: t(`${item.description}`),
                                        }}
                                    />
                                </Element>
                            ))}
                        </div>
                        {/* End of content */}
                    </div>
                </Container>
            </div>
        </>
    );
}
