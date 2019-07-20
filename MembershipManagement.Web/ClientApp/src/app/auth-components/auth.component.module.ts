import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppNgbModule } from 'app/app.ngb.module';
import { LoginComponent, SignupComponent } from 'app/auth-components';
import { SignupButtonComponent } from 'app/auth-components/signup-button/signup-button.component';
import { CommonSharedComponentModule } from 'app/common-shared/common-shared-component.module';
import { AuthService } from 'app/auth-components/services/auth.service';
import { LoginButtonComponent } from 'app/auth-components/login-button/login-button.component';
import { LogoutButtonComponent } from 'app/auth-components/logout-button/logout-button.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgbModule,
    CommonSharedComponentModule
  ],
  declarations: [
    LoginComponent,
    LoginButtonComponent,
    SignupComponent,
    SignupButtonComponent,
    LogoutButtonComponent

  ],
  exports: [
    LoginComponent,
    LoginButtonComponent,
    SignupComponent,
    SignupButtonComponent,
    LogoutButtonComponent

  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ]

})

export class AuthComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthComponentModule,
      providers: [
        AuthService
      ]
    };
  }
}
