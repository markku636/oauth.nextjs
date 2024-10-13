import { MAX_ALLOWED_QUANTITY, UNLIMITED_STOCK_NUM } from '@/const/product';

export function getMaxPickQty(stock: number) {
    if (stock === UNLIMITED_STOCK_NUM) {
        return MAX_ALLOWED_QUANTITY;
    }

    if (stock < MAX_ALLOWED_QUANTITY) {
        return stock;
    }

    return MAX_ALLOWED_QUANTITY;
}
