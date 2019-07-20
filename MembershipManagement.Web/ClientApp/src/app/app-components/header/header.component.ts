import { Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { selectNavMenuToggle } from 'app/reducer-stores/generic-module/navmenu/navmenu.selectors';
import { Observable, of } from 'rxjs';
import { NavMenuShow } from 'app/reducer-stores/generic-module/navmenu/navmenu.actions';
import { AuthService } from 'app/auth-components/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isNavMenuToggleEnabled$ :Observable<boolean> = of(false);
  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;


  constructor(private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isNavMenuToggleEnabled$ = this.store.select(selectNavMenuToggle);
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;

  }

  ngOnDestroy(): void {
  }

  public openNavMenu(): void {
    this.store.dispatch(new NavMenuShow({ isNavMenuOverlay: true }));
  }


}
