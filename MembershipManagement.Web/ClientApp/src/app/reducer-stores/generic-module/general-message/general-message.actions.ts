import { Action } from '@ngrx/store';
import { GeneralMessageModel } from 'app/models/general-message.model';

export enum GeneralMessageTypes {
  GeneralMessageLoaded = '[GeneralMessage] General Message Loaded',
  GeneralMessageRemoved = '[GeneralMessage] General Message Removed'
}

export class GeneralMessageLoaded implements Action {
  readonly type = GeneralMessageTypes.GeneralMessageLoaded;
  constructor(public payload: { generalMessage : GeneralMessageModel }) { }
}

export class GeneralMessageRemoved implements Action {
  readonly type = GeneralMessageTypes.GeneralMessageRemoved;
}

export type GeneralMessageActions =
  GeneralMessageLoaded | GeneralMessageRemoved;
