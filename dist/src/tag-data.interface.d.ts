export interface MetaData {
    type: string;
    content: string;
    attribute?: string;
}
export interface TagData {
    title?: string;
    name?: MetaData[];
    property?: MetaData[];
    meta?: MetaData[];
    canonical?: string;
}
