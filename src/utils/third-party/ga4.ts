/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { ICart, ICartItem } from '@/typing/api/cart-api-type';

const currency = 'EUR';
const brand = 'Cool3C';

export type GAProductCategory = 'gear' | 'configurator' | 'prebuild';

export interface ICustomGAItem {
    id: string;
    name: string;
    price: number;
    category: GAProductCategory;
    quantity?: number;
}

interface IGA4Item {
    item_id: string; // 'SKU_12345', skuId
    item_name: string; // 'Stan and Friends Tee', title
    item_brand: string;
    item_category: GAProductCategory;
    price: number;
    quantity?: number;
    // optional
    index?: number;
    coupon?: string;
    discount?: number;
    affiliation?: string; // 'Google Merchandise Store'
    item_category2?: string; // 'Shirts'
    item_category3?: string; // 'Crew'
    item_category4?: string;
    item_category5?: string;
    item_list_id?: string; // 'related_products'
    item_list_name?: string; // 'Related Products'
    item_variant?: string; // 'green'
    location_id?: string;
}

function safeGtag(eventName: string, params: any) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    } else {
        console.warn(`gtag is not defined or not loaded. Event: ${eventName}`, params);
    }
}

export function addToCartGA4API(data: ICustomGAItem) {
    safeGtag('add_to_cart', {
        currency,
        shopping_stage: 'AddToCart',
        value: data.price,
        items: [transformGA4Item(data)],
    });
}

export function removeFromCartGA4API(cartItem: ICartItem) {
    safeGtag('remove_from_cart', {
        currency,
        value: cartItem.price,
        items: [transformGA4CartItem(cartItem)],
    });
}

export function viewItemGA4API(data: ICustomGAItem) {
    safeGtag('view_item', {
        currency,
        value: data.price,
        items: [transformGA4Item(data)],
    });
}

export function viewItemListGA4API(data: ICustomGAItem[]) {
    safeGtag('view_item_list', {
        // item_list_id: 'related_products', // enable if needed
        // item_list_name: 'Related products', // enable if needed
        items: data.map(transformGA4Item),
    });
}

export function beginCheckoutGA4API(cart: ICart, coupon?: string) {
    safeGtag('begin_checkout', {
        currency,
        coupon,
        value: cart.subTotal,
        items: transformGA4CartItemList(cart.cartItems),
    });
}

export function addShippingInfoGA4API(cart: ICart, coupon?: string) {
    safeGtag('add_shipping_info', {
        currency,
        coupon,
        value: cart.subTotal,
        items: transformGA4CartItemList(cart.cartItems),
        // shipping_tier
    });
}

// Place Order
export function addPaymentInfoGA4API(data: {
    cartItems: ICartItem[];
    subTotal: number;
    paymentType: string;
    coupon?: string;
}) {
    const { cartItems, subTotal, coupon, paymentType } = data;

    safeGtag('add_payment_info', {
        currency,
        coupon,
        value: subTotal,
        items: transformGA4CartItemList(cartItems),
        payment_type: paymentType,
    });
}

export function purchaseGA4API(data: {
    cartItems: ICartItem[];
    subTotal: number;
    custOrderID: string;
    tax: number;
    shippingFee: number;
    coupon?: string;
    referralCode?: string;
}) {
    const { cartItems, subTotal, coupon, custOrderID, tax, shippingFee, referralCode } = data;

    safeGtag('purchase', {
        transaction_id: custOrderID,
        currency,
        tax,
        shipping: shippingFee,
        coupon,
        value: subTotal,
        items: transformGA4CartItemList(cartItems, referralCode),
    });
}

// helper
function transformGA4Item(data: ICustomGAItem): IGA4Item {
    const { id: id, name: title, price, category: category, quantity: selectedQty } = data;

    return {
        item_id: id, // skuId or modelId
        item_name: title,
        item_brand: brand,
        item_category: category,
        price: price,
        quantity: selectedQty ?? 1,
    };
}

function transformGA4CartItem(cartItem: ICartItem, referral: string = ''): IGA4Item {
    const { modelID, skuID, itemDescription, price, quantity } = cartItem;
    const isModel = modelID !== 0;
    const modelCategory = cartItem.prebuild ? 'prebuild' : 'configurator';
    const itemCategory = isModel ? (modelCategory as GAProductCategory) : ('gear' as GAProductCategory);

    const cartItemInfo = {
        item_id: isModel ? modelID.toString() : skuID.toString(),
        item_name: modelID ? formatHtmlBrTag(itemDescription) : itemDescription,
        item_brand: brand,
        item_category: itemCategory,
        price: price,
        quantity: quantity,
        affiliation: referral,
    };

    return cartItemInfo;
}

function transformGA4CartItemList(cartItems: ICartItem[], referral?: string): IGA4Item[] {
    return cartItems.map((item) => transformGA4CartItem(item, referral));
}

export const formatHtmlBrTag = (itemDesc: string) => {
    const index = itemDesc.indexOf('<br/>');

    return index === -1 ? itemDesc : itemDesc.substring(0, index);
};
