import { ModuleWithProviders } from '@angular/core';
import { NGMeta } from './ngmeta.service';
export declare class NgMetaModule {
    private _ngMeta;
    constructor(_ngMeta: NGMeta);
    static forRoot(): ModuleWithProviders;
}
