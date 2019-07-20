import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerConstant } from 'app/reducer-stores/reducer-constants';
import { GeneralMessageState } from 'app/reducer-stores/generic-module/general-message/general-message.reducers';

export const selectGeneralMessageState = createFeatureSelector<GeneralMessageState>(ReducerConstant.generalMessageReducer);

export const selectGeneralMessages = (id: string) => createSelector(
  selectGeneralMessageState,
  state => state.entities[id]
);

export const selectMessageId = createSelector(
  selectGeneralMessageState,
  state => state.currentId
);



