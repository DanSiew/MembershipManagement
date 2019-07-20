
export class TextInputModel {
  eventComponent: string = '';
  inputName: string = '';
  inputName2: string = '';
  inputLabel: string = '';
  inputLabel2: string = '';
  minLength: number = 0;
  maxLength: number = 0;
  isRequired: boolean = false;
  maxDate: any;
  minDate: any;
  max: number = 0;
  min: number = 0;
  hasMax: boolean = false;
  decimalPlace: number = 0;
  placeholder?: string;
  hasLink?: boolean;
  linkLabel?: string;
  textAreaRow?: number = 5;
  showLabel?: boolean = true;
  showPlaceholder?: boolean = false;
  spaceValidation?: boolean = false;
  toTitleCase?: boolean = false;
  customValidationMessage?: string = '';
  errorInputLabel?: string;
}
