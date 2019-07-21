
import {AuthActions, AuthActionTypes} from 'app/reducer-stores/auth-module/auth/auth.actions';
import { User } from 'app/models/user';
import { ANONYMOUS_USER } from 'app/reducer-stores/auth-module/services/auth-reducer.service';


export interface AuthState {
  user: User,
  error: any,
  loading: boolean
}

export const initialAuthState: AuthState = {
  user: ANONYMOUS_USER,
  error: undefined,
  loading: false
};

export function authReducer(
    state = initialAuthState,
    action: AuthActions): AuthState {
                              
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return { ...state, loading: true, error: undefined };

    case AuthActionTypes.AuthError:
      return { ...state, loading: false, error: action.payload.error };

    case AuthActionTypes.LoadUser:
      return { ...state, loading: false, user: action.payload.user };

    case AuthActionTypes.LogoutAction:
      return { ...state, loading: false, error: undefined, user: ANONYMOUS_USER };

    case AuthActionTypes.SignUpAction:
      return { ...state, loading: true, error: undefined };

    case AuthActionTypes.AuthClearError:
      return { ...state, error: undefined };


    default:
      return state;
  }
}
