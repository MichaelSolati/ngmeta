/**
 * An interface/data type for an the TagData interface.
 *
 * @module MetaData
 */
export interface MetaData {
    type: string;
    content: string;
    attribute?: string;
}

/**
 * An interface/data type for an object that is used with the 'setHead()' function.
 *
 * @module TagData
 */
export interface TagData {
    title?: string;
    name?: MetaData[];
    property?: MetaData[];
    meta?: MetaData[];
    canonical?: string;
}
