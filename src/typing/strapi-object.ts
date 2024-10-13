export interface StrapiImageObject {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        xsmall: StrapiImageFormat;
        thumbnail: StrapiImageFormat;
        small: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null; // Replace 'any' with a more specific type if the format is known
    createdAt: string; // Or Date if you prefer to work with Date objects
    updatedAt: string; // Or Date if you prefer to work with Date objects
}

interface StrapiImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    public_id: string;
    url: string;
}

export interface StrapiModelID {
    modelID: number;
}

export interface StrapiSkuID {
    skuID: number;
}
