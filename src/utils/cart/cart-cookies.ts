import { CookieKeys } from '@/const/keys';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export function setCartIDCookie(cartID: string) {
    Cookies.set(CookieKeys.CartID, cartID, { expires: 365 });
}

export function getCartIDCookie() {
    return Cookies.get(CookieKeys.CartID);
}

export function setRandomCartIDCookie() {
    setCartIDCookie(uuidv4());
}

export function cleanCartCookies() {
    removeCartIDCookie();
    removeCustOrderIDCookie();
}

export function removeCartIDCookie() {
    Cookies.remove(CookieKeys.CartID);
}

export function removeCustOrderIDCookie() {
    Cookies.remove(CookieKeys.CustOrderID);
}

export function getCustOrderIDCookie() {
    return Cookies.get(CookieKeys.CustOrderID) ?? '';
}
