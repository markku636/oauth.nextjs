import {
    IOrder,
    IOrderStatus,
    OrderDetailResponse,
    OrderHistoryFilterType,
    OrderStatusType,
} from '@/typing/api/order-api-type';
import { formatDateToDMY, formatNumberToCurrency } from '@utils/format';

export function generateOptions(t: (key: string) => string) {
    const lastThirtyDays = {
        name: t('text-30-days'),
        queryParams: {
            filterType: OrderHistoryFilterType.Day,
            filterNumber: 30,
        },
    };
    const currentYear = new Date().getFullYear();
    const lastFiveYears = Array.from({ length: 5 }, (_, index) => currentYear - index).map((year) => ({
        name: year.toString(),
        queryParams: {
            filterType: OrderHistoryFilterType.Year,
            filterNumber: year,
        },
    }));

    return [lastThirtyDays, ...lastFiveYears];
}

export const transformOrderDetailResponse = (response: OrderDetailResponse) => {
    const { orderStatus } = response.data;

    if (!orderStatus) {
        return response.data;
    }

    function concatAddresses(orderStatus: IOrderStatus) {
        return {
            ...orderStatus,
            shipAddress: {
                fullName: `${orderStatus.sFirstName} ${orderStatus.sLastName}`,
                company: orderStatus.sCompanyName,
                address: `${orderStatus.sAddress1} ${orderStatus.sAddress2}`,
                zipCodeAndcity: `${orderStatus.sZip} ${orderStatus.sCity}`,
                country: orderStatus.sCountry,
            },
            billAddress: {
                fullName: `${orderStatus.bFirstName} ${orderStatus.bLastName}`,
                company: orderStatus.bCompanyName,
                address: `${orderStatus.bAddress1} ${orderStatus.bAddress2}`,
                zipCodeAndcity: `${orderStatus.bZip} ${orderStatus.bCity}`,
                country: orderStatus.bCountry,
            },
        };
    }

    return {
        ...response.data,
        orderStatus: concatAddresses(orderStatus),
    };
};

export function transformOrderStatus(statusCode: number) {
    switch (statusCode) {
        case OrderStatusType.OrderReceived:
            return 'order-status-order-received';
        case OrderStatusType.Assembling:
            return 'order-status-assembling';
        case OrderStatusType.Testing:
            return 'order-status-testing';
        case OrderStatusType.ShipOut:
            return 'order-status-ship-out';
        default:
            return '';
    }
}

export function transformOrderData(orders: IOrder[], translateFn: (key: string) => string) {
    if (orders.length === 0) {
        return [];
    }

    return orders.map((order) => {
        const { custOrderID, orderDate, statusCode, total } = order;
        const status = transformOrderStatus(statusCode);
        const tranlsatedStatus = translateFn(status);
        const formatedDate = formatDateToDMY(new Date(orderDate));
        const formatedTotal = formatNumberToCurrency(total);

        return {
            custOrderID,
            status: tranlsatedStatus,
            orderDate: formatedDate,
            total: formatedTotal,
        };
    });
}
