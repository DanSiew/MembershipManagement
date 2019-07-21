import { Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { selectNavMenuToggle } from 'app/reducer-stores/generic-module/navmenu/navmenu.selectors';
import { Observable, of } from 'rxjs';
import { NavMenuShow } from 'app/reducer-stores/generic-module/navmenu/navmenu.actions';
import { selectLoginInfo } from '../../reducer-stores/auth-module/auth/auth.selectors';
import { map } from 'rxjs/operators';
import { User } from 'APP/models/user';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isNavMenuToggleEnabled$ :Observable<boolean> = of(false);
  public isLoggedIn$: Observable<boolean> = of(false);
  public isLoggedOut$: Observable<boolean> = of(true);
  private user$: Observable<User>;

  constructor(
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.isNavMenuToggleEnabled$ = this.store.select(selectNavMenuToggle);
    this.user$ = this.store.pipe(select(selectLoginInfo));
    this.isLoggedIn$ = this.user$.pipe(map(user => user.isAuthenticated));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  }

  ngOnDestroy(): void {
  }

  public openNavMenu(): void {
    this.store.dispatch(new NavMenuShow({ isNavMenuOverlay: true }));
  }


}
