import { RootRenderer } from "@angular/core";
import { TagData } from "./tag-data.interface";
export declare class NGMeta {
    private document;
    private rootRenderer;
    private body;
    private head;
    private isScrollEnabled;
    private renderer;
    constructor(document: any, rootRenderer: RootRenderer);
    setCanonical(canonicalURL: string): void;
    setTitle(title: string): void;
    setMeta(attribute: string, type: string, content: string): void;
    private scrollToTop(duration);
    setScrollEnabled(scroll: boolean): boolean;
    setHead(tagData: TagData): void;
    private removeTag(tagSelector);
}
