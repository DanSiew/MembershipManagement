import { GeneralMessageActions, GeneralMessageTypes } from 'app/reducer-stores/generic-module/general-message/general-message.actions';
import { GeneralMessageModel } from 'app/models/general-message.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export interface GeneralMessageState extends EntityState<GeneralMessageModel> {
  currentId: string
}

export const adapter: EntityAdapter<GeneralMessageModel> = createEntityAdapter<GeneralMessageModel>();

export const initialGeneralMessageState: GeneralMessageState = adapter.getInitialState({ currentId: '' });

export function generalMessageReducer(
  state = initialGeneralMessageState,
  action: GeneralMessageActions): GeneralMessageState {

  switch (action.type) {
    case GeneralMessageTypes.GeneralMessageLoaded: {
      return adapter.addOne(action.payload.generalMessage, { ...state, currentId: action.payload.generalMessage.id } );
    }
    case GeneralMessageTypes.GeneralMessageRemoved: {
      return adapter.removeAll({ ...state, currentId: '' });
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();


