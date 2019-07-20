import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReducerConstant } from "app/reducer-stores/reducer-constants";
import { NavMenuState } from 'app/reducer-stores/generic-module/navmenu/navmenu.reducers';

export const selectNavMenuState = createFeatureSelector<NavMenuState>(ReducerConstant.navmenuReducer);

export const selectNavMenuOpen = createSelector(
  selectNavMenuState,
  state => state.isNavMenuOpen);


export const selectNavMenuToggle = createSelector(
  selectNavMenuState,
  state => state.isNavMenuToggle);


export const selectNavMenuOverlay = createSelector(
  selectNavMenuState,
  state => state.isNavMenuOverlay);
