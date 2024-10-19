import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { AppState } from '../store';

type MODAL_VIEWS = 'SIGN_UP_VIEW' | 'LOGIN_VIEW' | 'FORGET_PASSWORD' | 'PRODUCT_VIEW';
type DRAWER_VIEWS = 'CART_SIDEBAR' | 'MOBILE_MENU';

type HEADER_MODAL_VIEWS = '' | 'ACCOUNT';
type POPUP_MODAL_VIEWS =
    | ''
    | 'COOPERATION'
    | 'CONSORS_FINANZ'
    | 'POLICY_AGREEMENT'
    | 'ACCEPT_COOKIES_SETTINGS'
    | 'SPEC_INFO'
    | 'SUMMARY_INFO'
    | 'GALLERY_POPUP';
type SIDEBAR_MODAL_VIEWS = '' | 'CART_SIDEBAR' | 'MOBILE_MENU';

export type POPUP_MODAL_DATA = {
    modalView?: POPUP_MODAL_VIEWS;
    modalData?: any;
    title?: string;
    customClassNames?: string;
    maxHeight: string;
    maxWidth: string;
};

export interface UIState {
    displaySidebar: boolean;
    displayFilter: boolean;
    displayModal: boolean;
    displayShop: boolean;
    displayCart: boolean;
    displaySearch: boolean;
    modalView: string;
    modalData: any;
    drawerView: string | null;
    toastText: string;

    // new ui state
    headerModalView: HEADER_MODAL_VIEWS;
    popupModalData: POPUP_MODAL_DATA;
    displayPopupModal: boolean;
    // cart sidebar
    displayCartSidebar: boolean;
    // cookie bar

    cookieSettings: {
        allowMarketing: boolean;
        allowAmazon: boolean;
        allowTrustShop: boolean;
    };
}

const initialState: UIState = {
    displaySidebar: false,
    displayFilter: false,
    displayModal: false,
    displayShop: false,
    displayCart: false,
    displaySearch: false,
    modalView: 'LOGIN_VIEW',
    drawerView: null,
    modalData: null,
    toastText: '',

    // new ui state
    headerModalView: '',
    displayPopupModal: false,
    popupModalData: {
        title: '',
        maxHeight: '',
        maxWidth: '',
        modalView: '',
        modalData: null,
    },
    // cart sidebar
    displayCartSidebar: false,
    // accept cookies

    cookieSettings: {
        allowMarketing: false,
        allowAmazon: false,
        allowTrustShop: false,
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.displaySidebar = true;
        },
        closeSidebar: (state) => {
            state.displaySidebar = false;
            state.drawerView = null;
        },
        openCart: (state) => {
            state.displayCart = true;
        },
        closeCart: (state) => {
            state.displayCart = false;
        },
        openSearch: (state) => {
            state.displaySearch = true;
        },
        closeSearch: (state) => {
            state.displaySearch = false;
        },
        openFilter: (state) => {
            state.displayFilter = true;
        },
        closeFilter: (state) => {
            state.displayFilter = false;
        },
        openShop: (state) => {
            state.displayShop = true;
        },
        closeShop: (state) => {
            state.displayShop = false;
        },
        openModal: (state) => {
            state.displayModal = true;
            state.displaySidebar = false;
        },
        closeModal: (state) => {
            state.displayModal = false;
        },
        setModalView: (state, action: PayloadAction<MODAL_VIEWS>) => {
            state.modalView = action.payload;
        },
        setDrawerView: (state, action: PayloadAction<DRAWER_VIEWS>) => {
            state.drawerView = action.payload;
        },
        setModalData: (state, action: PayloadAction<any>) => {
            state.modalData = action.payload.data;
        },
        setToastText: (state, action) => {
            state.toastText = action.payload.text;
        },
        // new ui state
        setHeaderModalView: (state, action: PayloadAction<HEADER_MODAL_VIEWS>) => {
            state.headerModalView = action.payload;
        },
        closeHeaderModal: (state) => {
            state.headerModalView = '';
        },
        openPopupModal: (state) => {
            state.displayPopupModal = true;
        },
        closePopupModal: (state) => {
            state.displayPopupModal = false;
        },
        setPopupModalData: (state, action: PayloadAction<POPUP_MODAL_DATA>) => {
            state.popupModalData = {
                ...state.popupModalData,
                ...action.payload,
            };
        },
        openCartSidebar: (state) => {
            state.displayCartSidebar = true;
        },
        closeCartSidebar: (state) => {
            state.displayCartSidebar = false;
        },

        updateCookieBarSettings: (
            state,
            action: PayloadAction<{ allowMarketing?: boolean; allowAmazon?: boolean; allowTrustShop?: boolean }>
        ) => {
            state.cookieSettings = { ...state.cookieSettings, ...action.payload };
        },
    },
});

export const {
    setAuthorized,
    setUnauthorized,
    openSidebar,
    closeSidebar,
    openCart,
    closeCart,
    openSearch,
    closeSearch,
    openFilter,
    closeFilter,
    openShop,
    closeShop,
    openModal,
    closeModal,
    setModalView,
    setDrawerView,
    setModalData,
    setToastText,
    setHeaderModalView,
    closeHeaderModal,
    setPopupModalData,
    openCartSidebar,
    closeCartSidebar,
    updateCookieBarSettings,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectUI = (state: AppState): UIState => state.ui;
export const useSelectUI = () => useAppSelector(selectUI);
