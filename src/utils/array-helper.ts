export function distinctArray(array: any[]): any[] {
    return [...new Set(array)].filter(Boolean);
}
