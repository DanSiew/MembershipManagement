import { Component } from '@angular/core';
import { AuthService } from 'app/auth-components/services/auth.service';

@Component({
  selector: 'app-logout-button',
  template: '<button type="button" class="btn btn-default" aria-label="Log out" (click)="logout($event)">Logout</button>',
  styleUrls: ['../../styles/common-styles.less']
})

export class LogoutButtonComponent {

  constructor(private authService: AuthService) { }

  public logout(): void {
    this.authService.logout();
  }
  
}
