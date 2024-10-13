import { ICart, ICartItem } from '@/typing/api/cart-api-type';
import { ICustomGAItem, addPaymentInfoGA4API, addToCartGA4API, purchaseGA4API, removeFromCartGA4API } from './ga4';

export function sendAddToCartEvent({ id, name, price, category, quantity }: ICustomGAItem) {
    addToCartGA4API({
        id,
        name,
        price,
        category,
        quantity,
    });
}

export function sendRemoveCartItemEvent({ cartItem }: { cartItem: ICartItem }) {
    removeFromCartGA4API(cartItem);
}

export function sendPurchaseEvent({
    cart,
    tax,
    shippingFee,
    custOrderID,
    paymentType,
}: {
    cart: ICart;
    tax: number;
    shippingFee: number;
    custOrderID: string;
    paymentType: string;
}) {
    // ga
    addPaymentInfoGA4API({
        cartItems: cart.cartItems,
        subTotal: cart.subTotal,
        paymentType,
    });
    purchaseGA4API({
        cartItems: cart.cartItems,
        subTotal: cart.subTotal,
        custOrderID: custOrderID,
        tax,
        shippingFee,
    });
}
