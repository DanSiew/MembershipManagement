import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from 'app/reducer-stores/auth-module/auth/auth.reducer';
import { AuthEffects } from 'app/reducer-stores/auth-module/auth/auth.effects';
import { ReducerConstant } from 'app/reducer-stores/reducer-constants';
import { AuthReducerService } from 'app/reducer-stores/auth-module/services/auth-reducer.service';


@NgModule({
  imports: [
    StoreModule.forFeature(ReducerConstant.authReducer, fromAuth.authReducer),
    EffectsModule.forRoot([
      AuthEffects]),
  ],
  declarations: [],
  exports: []
})

export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthReducerService]
    }
  }
}
