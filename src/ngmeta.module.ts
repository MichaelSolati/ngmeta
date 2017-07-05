import { NgModule, ModuleWithProviders, forwardRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NGMeta } from './ngmeta.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [NGMeta]
})
export class NgMetaModule {
  constructor(private _ngMeta: NGMeta) { }

  static forRoot(): ModuleWithProviders {
    return { ngModule: NgMetaModule };
  }
}
