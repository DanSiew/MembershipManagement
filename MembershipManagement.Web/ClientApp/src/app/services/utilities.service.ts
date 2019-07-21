import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { GeneralMessageType, GeneralMessageModel } from 'app/models/general-message.model';
import { GeneralMessageLoaded } from 'app/reducer-stores/generic-module/general-message/general-message.actions';

@Injectable()
export class UtilitiesService {

  constructor(
    private store: Store<AppState>) { }

  public dispatchMessage(messageId: string, message: string, messageType: GeneralMessageType): void {
    const generalMessage: GeneralMessageModel = new GeneralMessageModel();
    const dateNumber = new Date().getTime().toString();
    generalMessage.id = messageId + dateNumber;
    generalMessage.type = messageType;
    generalMessage.messages.push(message);
    this.store.dispatch(new GeneralMessageLoaded({ generalMessage }));
  }

}
