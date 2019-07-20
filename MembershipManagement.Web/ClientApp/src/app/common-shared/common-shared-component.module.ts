import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppNgbModule } from 'app/app.ngb.module';

import {
  AppTextInputComponent, ShowErrorsComponent, AppPasswordInputComponent, AppDialogComponent
} from 'app/common-shared';
import { CompDirective } from 'app/common-shared/directives/comp-host.directive';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppNgbModule
  ],
  declarations: [
    AppTextInputComponent,
    ShowErrorsComponent,
    AppPasswordInputComponent,
    AppDialogComponent,
    CompDirective
  ],
  exports: [
    AppTextInputComponent,
    ShowErrorsComponent,
    AppPasswordInputComponent,
    AppDialogComponent,
    CompDirective
  ],
  entryComponents: [
    AppDialogComponent
  ]
})
export class CommonSharedComponentModule {

}
