export const getComponentImageUrl = (skuID: number, url: string) => {
    if (skuID && url) {
        return `https://cdn.coolpc.de/common/components/${skuID}/${url}`;
    }

    return '';
};

export const getAbsoluteImageUrl = (relativeUrl: string) => {
    return 'https://cdn.coolpc.de/' + relativeUrl;
};

export const cleanEmptySpaceInImageUrl = (url: string) => {
    return url.replace(/ /g, '%20');
};
