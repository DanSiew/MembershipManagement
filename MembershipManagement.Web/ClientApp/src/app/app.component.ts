import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG } from 'app/styles/media';
import { map, takeWhile, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { ToastrService } from 'ngx-toastr';
import { NavMenuShow, NavMenuHide } from './reducer-stores/generic-module/navmenu/navmenu.actions';
import { selectNavMenuOpen, selectNavMenuOverlay } from 'app/reducer-stores/generic-module/navmenu/navmenu.selectors';
import { AuthReducerService } from './reducer-stores/auth-module/services/auth-reducer.service';
import { LoadUser } from './reducer-stores/auth-module/auth/auth.actions';
import { User } from 'app/models/user';
import { selectMessageId, selectGeneralMessages } from './reducer-stores/generic-module/general-message/general-message.selectors';
import { GeneralMessageModel, GeneralMessageType } from './models/general-message.model';
import { GeneralMessageRemoved } from './reducer-stores/generic-module/general-message/general-message.actions';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoaded: boolean = false;
  public isNavMenuExpanded$: Observable<boolean> = of(true);
  public isNavMenuOverlayVisible$: Observable<boolean> = of(false);
  private componentActive: boolean = true;
  private massegeloaded = false;

  readonly isSmallScreen$ = this.breakpointObserver.observe([BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG]).pipe(
    map(match => match.matches),
    shareReplay(1)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private authService: AuthReducerService,
    private toastrService: ToastrService,
    @Inject('LOCALSTORAGE') private localStorage: any) {

  }

  ngOnInit(): void {

    this.isNavMenuExpanded$ = this.store.select(selectNavMenuOpen);
    this.isNavMenuOverlayVisible$ = this.store.select(selectNavMenuOverlay);

    this.isSmallScreen$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(isSmallScreen => {
        if (isSmallScreen) {
          this.store.dispatch(new NavMenuHide());
        } else {
          this.store.dispatch(new NavMenuShow({ isNavMenuOverlay: false}));
        }
      });

    this.authService.getUser()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(user => {
        this.store.dispatch(new LoadUser({ user }));
        this.isLoaded = true;
      }, error => {
        const user: User = {
          id: '',
          email: '',
          isAuthenticated: false
        };
        this.localStorage.clear();
          this.store.dispatch(new LoadUser({ user }));
          this.isLoaded = true;

        });
    this.setupMessage();

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private setupMessage(): void {
    this.store.select(selectMessageId)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(messageId => {
        if (messageId !== '' && this.massegeloaded) {
          this.store.select(selectGeneralMessages(messageId))
            .pipe(takeWhile(() => this.componentActive))
            .subscribe(
              (generalMessage: GeneralMessageModel) => {
                if (generalMessage !== undefined) {
                  if (generalMessage.type === GeneralMessageType.none) {
                    const messages = generalMessage.messages;
                    messages.forEach(msg => {
                      this.toastrService.success(msg);
                    });
                    this.store.dispatch(new GeneralMessageRemoved());
                  }
                }
              });
        } else {
          this.massegeloaded = true;
          this.store.dispatch(new GeneralMessageRemoved());
        }
      });
  }

}
