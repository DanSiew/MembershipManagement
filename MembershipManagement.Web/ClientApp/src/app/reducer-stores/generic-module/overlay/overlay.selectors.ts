import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReducerConstant } from "app/reducer-stores/reducer-constants";
import { OverlayState } from 'app/reducer-stores/generic-module/overlay/overlay.reducers';

export const selectOverlayState = createFeatureSelector<OverlayState>(ReducerConstant.overlayReducer);

export const selectOverlay = createSelector(
  selectOverlayState,
  state => state.showed);
