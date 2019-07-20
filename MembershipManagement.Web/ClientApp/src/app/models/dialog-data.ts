export class DialogData {
  title: string;
  message?: string;
  buttonCloseText: string;
  buttonOkText: string;
  isOkay: boolean;
  dialogType: DialogType = DialogType.none;  
}

export enum DialogType {
  none = 0,
  signup = 1,
  login = 2
}
