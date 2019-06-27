/**
 * Interface for an the TagData interface.
 */
export type MetaData = {
    type: string;
    content: string;
    attribute?: string;
}

/**
 * Interface for an object that is used with the 'setHead()' function.
 */
export type TagData = {
    title?: string;
    name?: MetaData[];
    property?: MetaData[];
    meta?: MetaData[];
    canonical?: string;
}
