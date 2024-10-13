import { ShippingMethodType } from '@/const/cart/shipping-method-type';
import { IFinalAmountDetails } from '@/typing/api/cart-api-type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { AppState } from '../store';

export enum CartStep {
    Checkout = 0,
    ShippingAddress = 1,
    ShippingMethod = 2,
    Payment = 3,
}

export const EU_TAX_RATE = 0.19;

export interface ICartState {
    cartStep: CartStep;
    addressFields: IAddress;
    shippingMethod: {
        shippingFee: number;
        shippingMethodType: ShippingMethodType;
    };
    backendFinalAmount: IFinalAmountDetails;
}
export interface IShippingMethod {
    shippingFee: number;
    shippingMethodType: ShippingMethodType;
}

export interface IAddress {
    email: string;
    // for shipping field
    sFirstName: string;
    sLastName: string;
    sCompanyName: string;
    sAddress1: string;
    sAddress2: string;
    sCity: string;
    sZipCode: string;
    sCountry: string;
    sContactNum: string;
}

export const DEFAULT_ADDRESS_FIELDS: IAddress = {
    email: '',
    // for shipping field
    sFirstName: '',
    sLastName: '',
    sCompanyName: '',
    sAddress1: '',
    sAddress2: '',
    sCity: '',
    sZipCode: '',
    sCountry: '',
    sContactNum: '',
};

export const cartInitialState: ICartState = {
    cartStep: CartStep.Checkout,
    addressFields: DEFAULT_ADDRESS_FIELDS,
    shippingMethod: {
        shippingFee: 0,
        shippingMethodType: ShippingMethodType.DPD,
    },
    backendFinalAmount: {
        subTotal: 0,
        shippingFee: 0,
        total: 0,
        netAmount: 0,
        tax: 0,
        taxRate: EU_TAX_RATE,
        saving: 0,
    },
};

export const cartReducer = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        persistCart(_, action: PayloadAction<ICartState>) {
            return action.payload;
        },
        updateAddressFields(state, action: PayloadAction<IAddress>) {
            state.addressFields = action.payload;
        },
        updateCartStep(state, action: PayloadAction<CartStep>) {
            state.cartStep = action.payload;
        },
        updateShippingMethod(state, action: PayloadAction<IShippingMethod>) {
            state.shippingMethod.shippingFee = action.payload.shippingFee;
            state.shippingMethod.shippingMethodType = action.payload.shippingMethodType;
        },
        updateBackendFinalAmount(state, action: PayloadAction<IFinalAmountDetails>) {
            state.backendFinalAmount = action.payload;
        },
        // exclude cartStep
        resetCart(state) {
            return { ...cartInitialState, cartStep: state.cartStep };
        },
    },
});

export const {
    persistCart,
    updateCartStep,
    updateAddressFields,
    updateShippingMethod,
    updateBackendFinalAmount,
    resetCart,
} = cartReducer.actions;

export const selectCart = (state: AppState): ICartState => state.cart;
export const useSelectCart = () => useAppSelector(selectCart);
export const useSelectCartStep = () => useAppSelector((state) => state.cart.cartStep);
export const useSelectShippingMethod = () => useAppSelector((state) => state.cart.shippingMethod);
export const useSelectAddressFields = () => useAppSelector((state) => state.cart.addressFields);
export default cartReducer.reducer;
