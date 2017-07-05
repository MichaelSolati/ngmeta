import { Router } from '@angular/router';
import { TagData, MetaData } from './tag-data.interface';
export declare class NGMeta {
    private _document;
    private _router;
    private _dom;
    private _scrollEnabled;
    constructor(_document: any, _router: Router);
    canonical: string;
    title: string;
    scrollEnabled: boolean;
    createMeta(metaData: MetaData): void;
    setHead(tagData: TagData): void;
    private _removeTag(tagSelector);
    private _scrollToTop(evt);
}
