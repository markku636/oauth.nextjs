import { IFullAddress, IOrderStatusWithAddress, OrderStatusType } from '@/typing/api/order-api-type';
import { Row } from '@components/account-setting/order-info';
import { formatNumberToCurrency } from '@utils/format';

export function useOrderDetailViewData(t: (key: string) => string) {
    const orderStatusList = [
        { text: t('order-status-order-received'), status: OrderStatusType.OrderReceived },
        { text: t('order-status-assembling'), status: OrderStatusType.Assembling },
        { text: t('order-status-testing'), status: OrderStatusType.Testing },
        { text: t('order-status-ship-out'), status: OrderStatusType.ShipOut },
    ];

    const renderAddress = (fullAddress: IFullAddress) => {
        const { fullName, company, address, zipCodeAndcity, country } = fullAddress;

        return (
            <div className="flex flex-col">
                <span>{fullName}</span>
                <span>{company}</span>
                <span>{address}</span>
                <span>{zipCodeAndcity}</span>
                <span>{country}</span>
            </div>
        );
    };

    const orderInformationRows: Array<Row<IOrderStatusWithAddress>> = [
        {
            name: t('text-subtotal'),
            dataIndex: 'subTotal',
            render: (val) => formatNumberToCurrency(val as number),
        },
        {
            name: t('text-shipping'),
            dataIndex: 'shipFee',
            render: (val) => formatNumberToCurrency(val as number),
        },
        {
            name: t('text-tax'),
            dataIndex: 'tax',
            render: (val) => formatNumberToCurrency(val as number),
        },
        {
            name: t('text-total'),
            dataIndex: 'total',
            render: (val) => formatNumberToCurrency(val as number),
        },
        {
            name: t('text-ship-to'),
            dataIndex: 'shipAddress',
            render: (val) => renderAddress(val as IFullAddress),
        },
        {
            name: t('text-bill-to'),
            dataIndex: 'billAddress',
            render: (val) => renderAddress(val as IFullAddress),
        },
    ];

    return {
        orderStatusList,
        orderInformationRows,
    };
}
