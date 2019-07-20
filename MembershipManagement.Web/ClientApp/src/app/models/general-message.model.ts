export class GeneralMessageModel {

  id: string;
  messages: string[] = [];
  type: GeneralMessageType = GeneralMessageType.none;
}


export enum GeneralMessageType {
  none = 0
}


