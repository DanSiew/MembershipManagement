import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  public closeDialog = new EventEmitter<boolean>();

}
