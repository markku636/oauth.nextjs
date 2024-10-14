'use client';
import { useAppDispatch } from '@/redux/reducer/hooks';
import { POPUP_MODAL_DATA, setPopupModalData, useSelectUI } from '@/redux/reducer/ui/ui-slice';
import dynamic from 'next/dynamic';
import { MouseEventHandler } from 'react';

const ModalWrapper = dynamic(() => import('@components/common/modal/modal-wrapper'));
const CooperationPopup = dynamic(() => import('@components/popup/cooperation-popup'));

const PolicyAgreementPopup = dynamic(() => import('@components/popup/policy-agreement-pop-up'));
const CookieSettingsPopup = dynamic(() => import('@components/popup/cookie-settings-popup'));

const GalleryPopup = dynamic(() => import('@components/popup/gallery-popup'));

const DEFAULT_MODAL_DATA = {
    modalView: '',
    modalData: null,
    title: '',
    customClassNames: 'max-w-[90%] max-h-[1000px]',
} as POPUP_MODAL_DATA;

export default function PopupModal() {
    const dispatch = useAppDispatch();
    const {
        popupModalData: { modalView = '', title = '', customClassNames = 'max-w-[90%] max-h-[1000px]' },
    } = useSelectUI();
    const isOpen = modalView !== '';

    const onClose: MouseEventHandler<HTMLButtonElement> = (e) => {
        dispatch(setPopupModalData(DEFAULT_MODAL_DATA));
        e.stopPropagation();
    };

    return (
        <>
            {isOpen && (
                <ModalWrapper isOpen={isOpen} title={title} customClassNames={customClassNames} onClose={onClose}>
                    {modalView === 'COOPERATION' && <CooperationPopup />}
                    {modalView === 'POLICY_AGREEMENT' && <PolicyAgreementPopup />}
                    {modalView === 'ACCEPT_COOKIES_SETTINGS' && <CookieSettingsPopup />}
                    {modalView === 'GALLERY_POPUP' && <GalleryPopup />}
                </ModalWrapper>
            )}
        </>
    );
}
