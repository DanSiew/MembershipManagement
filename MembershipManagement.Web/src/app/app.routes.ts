import { Routes } from '@angular/router';
import {
    AboutComponent, HomeComponent, ContactComponent,
    LoginComponent, WelcomeComponent
} from './components/index';
import { AuthGuard } from './services/index';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] }

];

