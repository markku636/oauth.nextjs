import { BsTwitterX } from 'react-icons/bs';
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5';

export default function SocialNetWorkIcon({
    name,
    size = 30,
    color = 'black',
}: {
    name: string;
    size?: number;
    color?: string;
}) {
    switch (name) {
        case 'facebook':
            return <IoLogoFacebook size={size} color={color} />;
        case 'twitter':
            return <BsTwitterX size={size} color={color} />;
        case 'instagram':
            return <IoLogoInstagram size={size} color={color} />;
        case 'youtube':
            return <IoLogoYoutube size={size} color={color} />;
        default:
            return null;
    }
}
