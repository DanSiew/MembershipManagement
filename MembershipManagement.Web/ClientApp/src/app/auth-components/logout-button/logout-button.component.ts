import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { LogoutAction } from 'app/reducer-stores/auth-module/auth/auth.actions';
import { GeneralMessageType } from 'app/models/general-message.model';
import { UtilitiesService } from 'app/services/utilities.service';

@Component({
  selector: 'app-logout-button',
  template: '<button type="button" class="btn btn-default" aria-label="Log out" (click)="logout($event)">Logout</button>',
  styleUrls: ['../../styles/common-styles.less']
})

export class LogoutButtonComponent {

  constructor(private store: Store<AppState>,
    private util: UtilitiesService) { }

  public logout(): void {
    this.store.dispatch(new LogoutAction());
    const message = 'You have been logout successfully';
    this.util.dispatchMessage('logout-', message, GeneralMessageType.none);

  }
  
}
