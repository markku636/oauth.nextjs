import { IConsorsFinanzInstallment } from '../src/typing/product/consors-finanz';
import { getAllInstallmentInfo, getLastInstallmentInfo } from '../src/utils/product/consors-finanz';

describe('Function getLastInstallmentInfo returns correct info when:', () => {
    function genExpectedResult(monthlyPayment: number, installments: number, totalAmount: number) {
        return {
            monthlyPayment: expect.closeTo(monthlyPayment, 2),
            installments: installments,
            totalAmount: expect.closeTo(totalAmount, 2),
        };
    }

    test('Price is 99', () => {
        const expected = genExpectedResult(0, 0, 0);

        expect(getLastInstallmentInfo(99)).toEqual(expected);
    });

    test('Price is 869', () => {
        const expected = genExpectedResult(15.87, 72, 1142.64);

        expect(getLastInstallmentInfo(869)).toEqual(expected);
    });

    test('Price is 1399', () => {
        const expected = genExpectedResult(25.55, 72, 1839.6);

        expect(getLastInstallmentInfo(1399)).toEqual(expected);
    });

    test('Price is 1539', () => {
        const expected = genExpectedResult(28.1, 72, 2023.2);

        expect(getLastInstallmentInfo(1539)).toEqual(expected);
    });

    test('Price is 1549', () => {
        const expected = genExpectedResult(28.28, 72, 2036.16);

        expect(getLastInstallmentInfo(1549)).toEqual(expected);
    });

    test('Price is 1629', () => {
        const expected = genExpectedResult(29.75, 72, 2142);

        expect(getLastInstallmentInfo(1629)).toEqual(expected);
    });

    test('Price is 1639', () => {
        const expected = genExpectedResult(29.93, 72, 2154.96);

        expect(getLastInstallmentInfo(1639)).toEqual(expected);
    });

    test('Price is 1809', () => {
        const expected = genExpectedResult(33.03, 72, 2378.16);

        expect(getLastInstallmentInfo(1809)).toEqual(expected);
    });

    test('Price is 2059', () => {
        const expected = genExpectedResult(37.6, 72, 2707.2);

        expect(getLastInstallmentInfo(2059)).toEqual(expected);
    });

    test('Price is 3249', () => {
        const expected = genExpectedResult(59.33, 72, 4271.76);

        expect(getLastInstallmentInfo(3249)).toEqual(expected);
    });
});

describe('Function getAllInstallmentInfo returns correct info when:', () => {
    function genExpectedResult(arr: IConsorsFinanzInstallment[]) {
        return arr.map((item) => {
            return {
                installments: item.installments,
                monthlyPayment: expect.closeTo(item.monthlyPayment, 2),
                fixedNominalAnnualInterestPercentRate: expect.closeTo(item.fixedNominalAnnualInterestPercentRate, 2),
                effectiveAnnualInterestPercentRate: expect.closeTo(item.effectiveAnnualInterestPercentRate, 2),
                totalAmount: expect.closeTo(item.totalAmount, 2),
            };
        });
    }

    test('Price is 869', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 144.83,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 869.0,
            },
            {
                installments: 12,
                monthlyPayment: 72.41,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 869.0,
            },
            {
                installments: 18,
                monthlyPayment: 51.98,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 935.64,
            },
            {
                installments: 24,
                monthlyPayment: 39.89,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 957.36,
            },
            {
                installments: 30,
                monthlyPayment: 32.64,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 979.2,
            },
            {
                installments: 36,
                monthlyPayment: 27.82,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1001.52,
            },
            {
                installments: 42,
                monthlyPayment: 24.39,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1024.38,
            },
            {
                installments: 48,
                monthlyPayment: 21.82,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1047.36,
            },
            {
                installments: 54,
                monthlyPayment: 19.82,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1070.28,
            },
            {
                installments: 60,
                monthlyPayment: 18.24,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1094.4,
            },
            {
                installments: 66,
                monthlyPayment: 16.94,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1118.04,
            },
            {
                installments: 72,
                monthlyPayment: 15.87,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1142.64,
            },
        ]);

        expect(getAllInstallmentInfo(869)).toEqual(expected);
    });

    test('Price is 1399', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 233.16,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1399.0,
            },
            {
                installments: 12,
                monthlyPayment: 116.58,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1399.0,
            },
            {
                installments: 18,
                monthlyPayment: 83.68,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1506.24,
            },
            {
                installments: 24,
                monthlyPayment: 64.21,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1541.04,
            },
            {
                installments: 30,
                monthlyPayment: 52.55,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1576.5,
            },
            {
                installments: 36,
                monthlyPayment: 44.79,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1612.44,
            },
            {
                installments: 42,
                monthlyPayment: 39.26,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1648.92,
            },
            {
                installments: 48,
                monthlyPayment: 35.13,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1686.24,
            },
            {
                installments: 54,
                monthlyPayment: 31.92,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1723.68,
            },
            {
                installments: 60,
                monthlyPayment: 29.36,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1761.6,
            },
            {
                installments: 66,
                monthlyPayment: 27.28,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1800.48,
            },
            {
                installments: 72,
                monthlyPayment: 25.55,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1839.6,
            },
        ]);

        expect(getAllInstallmentInfo(1399)).toEqual(expected);
    });

    test('Price is 1539', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 256.5,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1539.0,
            },
            {
                installments: 12,
                monthlyPayment: 128.25,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1539.0,
            },
            {
                installments: 18,
                monthlyPayment: 92.05,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1656.9,
            },
            {
                installments: 24,
                monthlyPayment: 70.64,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1695.36,
            },
            {
                installments: 30,
                monthlyPayment: 57.81,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1734.3,
            },
            {
                installments: 36,
                monthlyPayment: 49.28,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1774.08,
            },
            {
                installments: 42,
                monthlyPayment: 43.19,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1813.98,
            },
            {
                installments: 48,
                monthlyPayment: 38.64,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1854.72,
            },
            {
                installments: 54,
                monthlyPayment: 35.11,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1895.94,
            },
            {
                installments: 60,
                monthlyPayment: 32.3,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1938,
            },
            {
                installments: 66,
                monthlyPayment: 30.01,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1980.66,
            },
            {
                installments: 72,
                monthlyPayment: 28.1,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2023.2,
            },
        ]);

        expect(getAllInstallmentInfo(1539)).toEqual(expected);
    });

    test('Price is 1549', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 258.16,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1549.0,
            },
            {
                installments: 12,
                monthlyPayment: 129.08,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1549.0,
            },
            {
                installments: 18,
                monthlyPayment: 92.65,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1667.7,
            },
            {
                installments: 24,
                monthlyPayment: 71.1,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1706.4,
            },
            {
                installments: 30,
                monthlyPayment: 58.19,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1745.7,
            },
            {
                installments: 36,
                monthlyPayment: 49.6,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1785.6,
            },
            {
                installments: 42,
                monthlyPayment: 43.47,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1825.74,
            },
            {
                installments: 48,
                monthlyPayment: 38.89,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1866.72,
            },
            {
                installments: 54,
                monthlyPayment: 35.34,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1908.36,
            },
            {
                installments: 60,
                monthlyPayment: 32.51,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1950.6,
            },
            {
                installments: 66,
                monthlyPayment: 30.2,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1993.2,
            },
            {
                installments: 72,
                monthlyPayment: 28.28,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2036.16,
            },
        ]);

        expect(getAllInstallmentInfo(1549)).toEqual(expected);
    });

    test('Price is 1629', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 271.5,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1629.0,
            },
            {
                installments: 12,
                monthlyPayment: 135.75,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1629.0,
            },
            {
                installments: 18,
                monthlyPayment: 97.44,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1753.92,
            },
            {
                installments: 24,
                monthlyPayment: 74.77,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1794.48,
            },
            {
                installments: 30,
                monthlyPayment: 61.19,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1835.7,
            },
            {
                installments: 36,
                monthlyPayment: 52.16,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1877.76,
            },
            {
                installments: 42,
                monthlyPayment: 45.72,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1920.24,
            },
            {
                installments: 48,
                monthlyPayment: 40.9,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1963.2,
            },
            {
                installments: 54,
                monthlyPayment: 37.17,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2007.18,
            },
            {
                installments: 60,
                monthlyPayment: 34.19,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2051.4,
            },
            {
                installments: 66,
                monthlyPayment: 31.76,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2096.16,
            },
            {
                installments: 72,
                monthlyPayment: 29.75,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2142.0,
            },
        ]);

        expect(getAllInstallmentInfo(1629)).toEqual(expected);
    });

    test('Price is 1639', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 273.16,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1639.0,
            },
            {
                installments: 12,
                monthlyPayment: 136.58,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1639.0,
            },
            {
                installments: 18,
                monthlyPayment: 98.03,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1764.54,
            },
            {
                installments: 24,
                monthlyPayment: 75.23,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1805.52,
            },
            {
                installments: 30,
                monthlyPayment: 61.57,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1847.1,
            },
            {
                installments: 36,
                monthlyPayment: 52.48,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1889.28,
            },
            {
                installments: 42,
                monthlyPayment: 46.0,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1932.0,
            },
            {
                installments: 48,
                monthlyPayment: 41.15,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1975.2,
            },
            {
                installments: 54,
                monthlyPayment: 37.4,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2019.6,
            },
            {
                installments: 60,
                monthlyPayment: 34.4,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2064.0,
            },
            {
                installments: 66,
                monthlyPayment: 31.96,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2109.36,
            },
            {
                installments: 72,
                monthlyPayment: 29.93,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2154.96,
            },
        ]);

        expect(getAllInstallmentInfo(1639)).toEqual(expected);
    });

    test('Price is 1809', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 301.5,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1809.0,
            },
            {
                installments: 12,
                monthlyPayment: 150.75,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 1809.0,
            },
            {
                installments: 18,
                monthlyPayment: 108.2,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1947.6,
            },
            {
                installments: 24,
                monthlyPayment: 83.04,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 1992.96,
            },
            {
                installments: 30,
                monthlyPayment: 67.96,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2038.8,
            },
            {
                installments: 36,
                monthlyPayment: 57.92,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2085.12,
            },
            {
                installments: 42,
                monthlyPayment: 50.77,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2132.34,
            },
            {
                installments: 48,
                monthlyPayment: 45.42,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2180.16,
            },
            {
                installments: 54,
                monthlyPayment: 41.27,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2228.58,
            },
            {
                installments: 60,
                monthlyPayment: 37.97,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2278.2,
            },
            {
                installments: 66,
                monthlyPayment: 35.27,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2327.82,
            },
            {
                installments: 72,
                monthlyPayment: 33.03,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2378.16,
            },
        ]);

        expect(getAllInstallmentInfo(1809)).toEqual(expected);
    });

    test('Price is 2059', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 343.16,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 2059.0,
            },
            {
                installments: 12,
                monthlyPayment: 171.58,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 2059.0,
            },
            {
                installments: 18,
                monthlyPayment: 123.16,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2216.88,
            },
            {
                installments: 24,
                monthlyPayment: 94.51,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2268.24,
            },
            {
                installments: 30,
                monthlyPayment: 77.35,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2320.5,
            },
            {
                installments: 36,
                monthlyPayment: 65.93,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2373.48,
            },
            {
                installments: 42,
                monthlyPayment: 57.79,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2427.18,
            },
            {
                installments: 48,
                monthlyPayment: 51.7,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2481.6,
            },
            {
                installments: 54,
                monthlyPayment: 46.98,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2536.92,
            },
            {
                installments: 60,
                monthlyPayment: 43.21,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2592.6,
            },
            {
                installments: 66,
                monthlyPayment: 40.15,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2649.9,
            },
            {
                installments: 72,
                monthlyPayment: 37.6,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 2707.2,
            },
        ]);

        expect(getAllInstallmentInfo(2059)).toEqual(expected);
    });

    test('Price is 3249', () => {
        const expected = genExpectedResult([
            {
                installments: 6,
                monthlyPayment: 541.5,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 3249.0,
            },
            {
                installments: 12,
                monthlyPayment: 270.75,
                fixedNominalAnnualInterestPercentRate: 0,
                effectiveAnnualInterestPercentRate: 0,
                totalAmount: 3249.0,
            },
            {
                installments: 18,
                monthlyPayment: 194.34,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 3498.12,
            },
            {
                installments: 24,
                monthlyPayment: 149.14,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 3579.36,
            },
            {
                installments: 30,
                monthlyPayment: 122.06,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 3661.8,
            },
            {
                installments: 36,
                monthlyPayment: 104.04,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 3745.44,
            },
            {
                installments: 42,
                monthlyPayment: 91.19,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 3829.98,
            },
            {
                installments: 48,
                monthlyPayment: 81.58,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 3915.84,
            },
            {
                installments: 54,
                monthlyPayment: 74.13,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 4003.02,
            },
            {
                installments: 60,
                monthlyPayment: 68.19,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 4091.4,
            },
            {
                installments: 66,
                monthlyPayment: 63.35,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 4181.1,
            },
            {
                installments: 72,
                monthlyPayment: 59.33,
                fixedNominalAnnualInterestPercentRate: 9.47,
                effectiveAnnualInterestPercentRate: 9.9,
                totalAmount: 4271.76,
            },
        ]);

        expect(getAllInstallmentInfo(3249)).toEqual(expected);
    });
});
