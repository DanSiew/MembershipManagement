import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent, CounterComponent, FetchDataComponent } from 'app/main-components';
import { AuthComponentModule } from 'app/auth-components/auth.component.module';
import { CommonSharedComponentModule } from 'app/common-shared/common-shared-component.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonSharedComponentModule
  ],
  declarations: [
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
 
  exports: [
    HomeComponent,
    CounterComponent,
    FetchDataComponent]
})

export class MainComponentModule { }
