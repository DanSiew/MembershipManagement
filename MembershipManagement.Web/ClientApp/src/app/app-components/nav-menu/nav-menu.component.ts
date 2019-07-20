import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG } from 'app/styles/media';
import { NavMenuHide } from 'app/reducer-stores/generic-module/navmenu/navmenu.actions';
import { selectNavMenuOpen } from 'app/reducer-stores/generic-module/navmenu/navmenu.selectors';
import { map, shareReplay, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-nav-menu',
  templateUrl: 'nav-menu.component.html',
  styleUrls: ['nav-menu.component.less']
})
export class NavMenuComponent implements OnInit, OnDestroy {
    
  private isExpanded = false;
  private componentActive: boolean = true;
  private isSmallScreen: boolean = false;

  readonly isSmallScreen$ = this.breakpointObserver.observe([BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG]).pipe(
    map(match => match.matches),
    shareReplay(1)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isSmallScreen$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(isSmallScreen => {
        this.isSmallScreen = isSmallScreen;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  collapse() {
    this.isExpanded = false;
    if (this.isSmallScreen) {
      this.store.dispatch(new NavMenuHide());
    }
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    if (this.isSmallScreen) {
      this.store.dispatch(new NavMenuHide());
    }
  }
}
