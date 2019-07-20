import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReducerConstant } from 'app/reducer-stores/reducer-constants';
import { generalMessageReducer } from 'app/reducer-stores/generic-module/general-message/general-message.reducers';
import { navmenuReducer } from "app/reducer-stores/generic-module/navmenu/navmenu.reducers";
import { overlayReducer } from 'app/reducer-stores/generic-module/overlay/overlay.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(ReducerConstant.generalMessageReducer, generalMessageReducer),
    StoreModule.forFeature(ReducerConstant.navmenuReducer, navmenuReducer),
    StoreModule.forFeature(ReducerConstant.overlayReducer, overlayReducer)
  ],
  declarations: [],
  exports: []
})
export class GenericModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GenericModule,
      providers: [
      ]
    };
  }
}
