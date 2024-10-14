import { useSelectUI } from '@/redux/reducer/ui/ui-slice';

import Image from 'next/image';

export default function CooperationPopup() {
    const {
        popupModalData: { modalData },
    } = useSelectUI();
    const imageUrl = modalData.data;

    return (
        <Image
            src={imageUrl}
            width={700}
            height={802}
            sizes="70vw"
            alt="Cooperation"
            className="max-h-[800px] object-contain"
        />
    );
}
