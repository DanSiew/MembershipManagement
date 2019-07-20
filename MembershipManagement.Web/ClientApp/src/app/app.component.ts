import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG } from 'app/styles/media';
import { Observable, noop, combineLatest, BehaviorSubject, of } from 'rxjs';
import { map, tap, takeWhile, shareReplay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { NavMenuShow, NavMenuHide } from './reducer-stores/generic-module/navmenu/navmenu.actions';
import { selectNavMenuOpen, selectNavMenuOverlay } from 'app/reducer-stores/generic-module/navmenu/navmenu.selectors';
import { AuthService } from 'app/auth-components/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'app';
  public isLoaded: boolean = false;
  public isNavMenuExpanded$: Observable<boolean> = of(true);
  public isNavMenuOverlayVisible$: Observable<boolean> = of(false);
  private componentActive: boolean = true;

  readonly isSmallScreen$ = this.breakpointObserver.observe([BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG]).pipe(
    map(match => match.matches),
    shareReplay(1)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private authService: AuthService) {

  }

  ngOnInit(): void {

    this.isNavMenuExpanded$ = this.store.select(selectNavMenuOpen);
    this.isNavMenuOverlayVisible$ = this.store.select(selectNavMenuOverlay);
    this.isNavMenuOverlayVisible$.subscribe(show => console.log('show', show));

    this.isSmallScreen$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(isSmallScreen => {
        if (isSmallScreen) {
          this.store.dispatch(new NavMenuHide());
        } else {
          this.store.dispatch(new NavMenuShow({ isNavMenuOverlay: false}));
        }
      });

    this.authService.getUser();

    this.isLoaded = true;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
