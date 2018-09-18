import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgMetaService } from './ngmeta.service'

@NgModule({
  imports: [],
  providers: [NgMetaService],
  declarations: []
})
export class NgMetaModule {
  constructor(private _ngmeta: NgMetaService) { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgMetaModule
    };
  }
}