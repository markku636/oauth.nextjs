import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateToDMY(date: Date) {
    return dayjs(date).format('DD.MM.YY');
}

export function formatDateToDMYWithTime(dateString: string) {
    // 將時間字符串轉換為 UTC 時間
    const date = dayjs.utc(dateString);
    const browserTimezone = dayjs.tz.guess();

    return date.tz(browserTimezone).format('DD.MM.YYYY HH:mm:ss');
}

export function formatNumberToCurrency(amount: number, maximumFractionDigits: number = 2) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol',
        maximumFractionDigits,
    }).format(amount);
}

export function formatNumber(amount: number, maximumFractionDigits: number = 2) {
    return new Intl.NumberFormat('de-DE', {
        maximumFractionDigits,
    }).format(amount);
}

export const RoundType = {
    Round: 0, // 四捨五入
    Celi: 1, // 無條件進位
    Floor: 2, // 無條件捨去
    EvenRound: 3, // 銀行家算法 四捨六入五成雙
};

// 數字格式化
export const numberFormat = (
    num: number,
    decimal: number = 2, // 小數幾位
    isZeroPadding: boolean = false, // 缺項補零
    isNeedThousandComma: boolean = false, // 千分位
    roundType = RoundType.EvenRound
) => {
    try {
        let result;

        if (num === undefined) {
            return num;
        }

        if (isNaN(num)) {
            return num.toString();
        }

        let newNumber;
        const sign = Math.sign(num);

        // 進位
        switch (roundType) {
            // 四捨五入
            case RoundType.Round:
                newNumber = (Math.round(Math.abs(num) * Math.pow(10, decimal)) / Math.pow(10, decimal)) * sign;
                break;
            // 無條件進位
            case RoundType.Celi:
                newNumber = Math.ceil(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
                break;
            // 無條件捨去
            case RoundType.Floor:
                newNumber = parseFloat(num.toFixed(decimal));
                break;
            case RoundType.EvenRound:
                newNumber = evenRound(num, decimal);
                break;
            default:
                newNumber = num;
        }

        // add Comma
        let newNumberStr = newNumber.toString();

        if (isZeroPadding) {
            if (newNumberStr.indexOf('.') === -1) {
                newNumberStr += '.';
            }
            const numberArray = newNumberStr.split('.');
            let x1 = numberArray[0];

            if (isNeedThousandComma) {
                const rgx = /(\d+)(\d{3})/;

                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
            }

            let x2 = numberArray.length > 1 ? numberArray[1] : '';
            // 缺項補零

            while (x2.length < decimal) {
                x2 += '0';
            }

            if (decimal > 0) {
                x2 = '.' + x2;
            }

            result = x1 + x2;
            return result;
        }
        return newNumberStr;
    } catch (e) {
        return num.toString();
    }
};

function evenRound(num: number, decimalPlaces: number) {
    const d = decimalPlaces || 0;
    const m = Math.pow(10, d);
    const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    const i = Math.floor(n),
        f = n - i;
    const e = 1e-8; // Allow for rounding errors in f
    const r = f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n);

    return d ? r / m : r;
}
