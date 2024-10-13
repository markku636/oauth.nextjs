export default function translateDeep<T>(data: T, translateFn: (key: any) => any): T {
    // handle Primitive type
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    // handle array
    if (Array.isArray(data)) {
        return data.map((item) => translateDeep(item, translateFn)) as T;
    }

    // handle object
    const result: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            result[key] = '';
        } else {
            result[key] = key.endsWith('Lang') ? translateFn(value as string) : translateDeep(value, translateFn);
        }
    });

    return result as T;
}
