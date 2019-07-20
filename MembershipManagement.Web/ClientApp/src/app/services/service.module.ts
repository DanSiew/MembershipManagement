import { NgModule, ModuleWithProviders } from '@angular/core';
import { DialogService } from 'app/services/dialog.service';
import { GenericService } from 'app/services/generic.service';
import { NavigationService } from 'app/services/navigation.service';

@NgModule()
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        DialogService,
        GenericService,
        NavigationService
      ]
    };
  }
}
