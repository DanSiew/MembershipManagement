import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'app/app.component';
import { MainComponentModule } from 'app/main-components/main-compoments.module';
import { NavMenuComponent, ProfileComponent, HeaderComponent } from 'app/app-components';
import { routing } from 'app/app-components';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'app/reducers';
import { ToastrModule } from "ngx-toastr";
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GenericModule } from 'app/reducer-stores/generic-module/generic-module';
import { SharedProvider } from 'app/app-components/providers/app.shared.provider';
import { AppNgbModule } from 'app/app.ngb.module';
import { AuthComponentModule } from 'app/auth-components/auth.component.module';
import { ServiceModule } from './services/service.module';
import { AuthModule } from './reducer-stores/auth-module/auth.module';

@NgModule({
  declarations: [
    NavMenuComponent,
    ProfileComponent,
    HeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    MainComponentModule,
    BrowserAnimationsModule,
    AppNgbModule,
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-bottom-right', preventDuplicates: true, }),
    AuthComponentModule.forRoot(),
    ServiceModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    GenericModule.forRoot(),
    AuthModule.forRoot()

  ],
  providers: [
    { provide: 'CLIENT', useFactory: SharedProvider.getClients },
    { provide: 'CONSTANT', useFactory: SharedProvider.getConstants },
    { provide: 'LOCALSTORAGE', useFactory: SharedProvider.getLocalStorage },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
