import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

import { NavbarComponent } from './navbar/navbar.component';

import { AboutComponent, HomeComponent, ContactComponent, LoginComponent, WelcomeComponent } from './components/index';
import { AuthenticationService, UserService, AuthGuard } from './services/index';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        ContactComponent,
        LoginComponent,
        WelcomeComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: true }),
        NgReduxModule,
        NgReduxRouterModule
    ],
    providers: [
        AuthenticationService,
        UserService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
