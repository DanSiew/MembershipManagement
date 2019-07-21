import { Action } from '@ngrx/store';
import { User } from "app/models/user";
import { LoginModel } from 'app/models/login.model';
import { SignupModel } from 'app/models/signup.model';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
  LoadUser = '[LoadUser] Action',
  AuthError = '[AuthError] Action',
  SignUpAction = '[Sign up] Action',
  AuthClearError = '[ClearAuthError] Action',
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload: { user: LoginModel }) {
  }
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AuthError;
  constructor(public payload: { error: any }) {
  }
}

export class LoadUser implements Action {
  readonly type = AuthActionTypes.LoadUser;
  constructor(public payload: { user: User }) {
  }
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class SignUpAction implements Action {
  readonly type = AuthActionTypes.SignUpAction;
  constructor(public payload: { signupUser: SignupModel }) {
  }
}

export class AuthClearError implements Action {
  readonly type = AuthActionTypes.AuthClearError;
 }


export type AuthActions =
  LoginAction |
  AuthError |
  LoadUser |
  LogoutAction |
  SignUpAction |
  AuthClearError;
