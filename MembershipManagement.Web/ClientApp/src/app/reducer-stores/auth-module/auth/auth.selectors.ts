import {createSelector, Selector, createFeatureSelector} from '@ngrx/store';
import { ReducerConstant } from "app/reducer-stores/reducer-constants";
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(ReducerConstant.authReducer);

export const selectLoginInfo = createSelector(
  selectAuthState,
  state => state.user
);

export const selectUserLoading = createSelector(
  selectAuthState,
  state => state.loading
);


export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);
