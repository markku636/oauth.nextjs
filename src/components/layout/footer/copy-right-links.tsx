import { ICopyrightInfomation } from '@/typing/layout';
import Link from 'next/link';

export default function CopyrightLinks({ informations }: Readonly<{ informations: ICopyrightInfomation[] }>) {
    return (
        <ul className="flex flex-wrap">
            {informations.map((info, i) => {
                const last = i === informations.length - 1;
                const { id, href, labelLang } = info;

                return (
                    <li key={id}>
                        <Link href={href} className="flex gap-1">
                            <span>{labelLang}</span>
                            {!last && <span className="mx-1">|</span>}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
