import { useSelectUI } from '@/redux/features/ui/ui-slice';

export default function PolicyAgreementPopup() {
    const {
        popupModalData: { modalData },
    } = useSelectUI();

    const data: {
        title: string;
        description: string;
    } = modalData.data;

    return (
        <div className="overflow-y-auto max-w-[800px] h-[70vh] md:h-[75vh] flex flex-col items-center gap-4">
            <h4 className="font-bold text-lg xl:text-2xl">{data.title}</h4>
            <p
                className="text-sm md:text-base [&>ol]:flex [&>ol]:flex-col [&>ol]:gap-3 [&>ol]:px-3"
                dangerouslySetInnerHTML={{ __html: data.description }}
            ></p>
        </div>
    );
}
