import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgMetaService } from './ngmeta.service'

@NgModule({
  providers: [NgMetaService],
})
export class NgMetaModule {
  constructor(private _ngmeta: NgMetaService) { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgMetaModule,
      providers: [NgMetaService]
    };
  }
}