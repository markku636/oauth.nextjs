'use client';
import { useAppDispatch, useAppSelector } from '@/redux/reducer/hooks';
import { closeModal, selectUI } from '@/redux/reducer/ui/ui-slice';
import dynamic from 'next/dynamic';
import Newsletter from '../newsletter';
import Modal from './modal';

const ProductPopup = dynamic(() => import('@components/product/product-popup'));

const ManagedModal = () => {
    const { displayModal, modalView } = useAppSelector(selectUI);
    const dispatch = useAppDispatch();

    return (
        <Modal open={displayModal} onClose={() => dispatch(closeModal())}>
            {modalView === 'PRODUCT_VIEW' && <ProductPopup />}
            {modalView === 'NEWSLETTER_VIEW' && <Newsletter />}
        </Modal>
    );
};

export default ManagedModal;
