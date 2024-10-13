import { DEFlag } from '@components/icons/DEFlag';
import { USFlag } from '@components/icons/USFlag';

export default function LanguageIcon({
    language,
    width = '20px',
    height = '15px',
}: {
    language: string;
    width?: string;
    height?: string;
}) {
    switch (language) {
        case 'en':
            return <USFlag width={width} height={height} />;
        case 'de':
            return <DEFlag width={width} height={height} />;
        default:
            return null;
    }
}