import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGMeta } from './ngmeta.service';
var NgMetaModule = (function () {
    function NgMetaModule(_ngMeta) {
        this._ngMeta = _ngMeta;
    }
    NgMetaModule.forRoot = function () {
        return { ngModule: NgMetaModule };
    };
    return NgMetaModule;
}());
export { NgMetaModule };
NgMetaModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [],
                providers: [NGMeta]
            },] },
];
/** @nocollapse */
NgMetaModule.ctorParameters = function () { return [
    { type: NGMeta, },
]; };
//# sourceMappingURL=ngmeta.module.js.map