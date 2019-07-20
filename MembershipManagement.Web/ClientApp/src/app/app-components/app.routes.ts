import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, CounterComponent, FetchDataComponent } from 'app/main-components';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });
