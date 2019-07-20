import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class NavigationService {
  constructor(
    @Inject('CONSTANT') private constant: any,
    private router: Router
  ) { }

  public loggingOut = new EventEmitter<boolean>();

  public navigateTo(path: string, queryParams: any): void {
    if (queryParams !== null) {
      this.router.navigate(['/' + path],
        { queryParams: queryParams });
    } else {
      this.router.navigate(['/' + path]);
    }

  }

  public navigateToUnauthorise(): void {
    this.router.navigate(['/' + this.constant.path.unauthorize]);
  }

  public navigateToHome(): void {
    this.router.navigate(['/' + this.constant.path.home]);
  }
}
