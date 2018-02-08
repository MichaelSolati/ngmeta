import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMetaService } from './ngmeta.service'

@NgModule({
  imports: [],
  providers: [NgMetaService],
  declarations: []
})
// @ts-ignore
export class NgMetaModule {
  constructor(private _ngmeta: NgMetaService) { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgMetaModule
    };
  }
}