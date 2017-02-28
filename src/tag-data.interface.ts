/**
 * Interface for an the TagData interface.
 */
export interface MetaData {
    type: string;
    content: string;
    attribute?: string;
}

/**
 * Interface for an object that is used with the 'setHead()' function.
 */
export interface TagData {
    title?: string;
    name?: MetaData[];
    property?: MetaData[];
    meta?: MetaData[];
    canonical?: string;
}
