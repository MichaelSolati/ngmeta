import { RootRenderer } from "@angular/core";
import { Router } from '@angular/router';
import { TagData, MetaData } from "./tag-data.interface";
export declare class NGMeta {
    private _document;
    private _rootRenderer;
    private _router;
    private _body;
    private _head;
    private _scrollEnabled;
    private _renderer;
    constructor(_document: any, _rootRenderer: RootRenderer, _router: Router);
    canonical: string;
    title: string;
    scrollEnabled: boolean;
    createMeta(metaData: MetaData): void;
    setHead(tagData: TagData): void;
    private _removeTag(tagSelector);
    private _scrollToTop(evt);
}
