import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { AuthActionTypes, LoginAction, LogoutAction, LoadUser, AuthError, SignUpAction } from 'app/reducer-stores/auth-module/auth/auth.actions';
import { AuthReducerService } from 'app/reducer-stores/auth-module/services/auth-reducer.service';
import { User } from 'app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { ResponseData } from 'app/models/auth.result';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthReducerService,
    @Inject('LOCALSTORAGE') private localStorage: any) {
  }

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<LoginAction>(AuthActionTypes.LoginAction),
      mergeMap(action => this.authService.login(
        action.payload.user.emailAddress, action.payload.user.password)
        .pipe(
          catchError(errResponse => {
            this.store.dispatch(new AuthError({ error: errResponse.error }));
            const response = new ResponseData();
            response.userId = '';
            response.userEmail = '';
            response.data = '';
            response.isAuthenticated = false;
            return of(response);
          })
        )),
      map((response: ResponseData) => {
        if (response.data !== '') {
          let data = JSON.parse(response.data);
          this.localStorage.setItem('token', data.access_token);
        }
        let user: User = {
          id: response.userId,
          email: response.userEmail,
          isAuthenticated: response.isAuthenticated
        }
        return new LoadUser({ user })
      }));



  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(AuthActionTypes.LogoutAction),
    tap(() => {
      this.authService.logout();
    })
  );


  @Effect()
  signUp$ = this.actions$
    .pipe(
      ofType<SignUpAction>(AuthActionTypes.SignUpAction),
      mergeMap(action => this.authService.signUp(
        action.payload.signupUser.emailAddress, action.payload.signupUser.password)
        .pipe(
          catchError(errResponse => {
            this.store.dispatch(new AuthError({ error: errResponse.error }));
            const response = new ResponseData();
            response.userId = '';
            response.userEmail = '';
            response.data = '';
            response.isAuthenticated = false;
            return of(response);
          })
        )),
      map((response: ResponseData) => {
        console.log('response', response);
        if (response.data !== '') {
          let data = JSON.parse(response.data);
          this.localStorage.setItem('token', data.access_token);
        }
        let user: User = {
          id: response.userId,
          email: response.userEmail,
          isAuthenticated: response.isAuthenticated
        }
        return new LoadUser({ user })
      }));
}
