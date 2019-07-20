import { TextInputModel } from 'app/models/text-input.model';

export interface ISignUpViewModel {
  textInputEmailAddress: TextInputModel;
  textInputConfirmPassword: TextInputModel;
  textInputPassword: TextInputModel;
}

export const SignInUpViewModel: ISignUpViewModel = {

  textInputEmailAddress: {
    eventComponent: 'User Component',
    inputName: 'emailAddress',
    inputName2: '',
    inputLabel: 'Email address',
    inputLabel2: '',
    minLength: 4,
    maxLength: 255,
    isRequired: true,
    maxDate: { year: 2200, month: 1, day: 1 },
    minDate: { year: 1900, month: 1, day: 1 },
    max: 0,
    min: 0,
    hasMax: false,
    decimalPlace: 0
  },
  textInputConfirmPassword: {
    eventComponent: 'User Component',
    inputName: 'confirmEmailAddress',
    inputName2: '',
    inputLabel: 'Confirm password',
    inputLabel2: '',
    minLength: 4,
    maxLength: 15,
    isRequired: true,
    maxDate: { year: 2200, month: 1, day: 1 },
    minDate: { year: 1900, month: 1, day: 1 },
    max: 0,
    min: 0,
    hasMax: false,
    decimalPlace: 0
  },
  textInputPassword: {
    eventComponent: 'User Component',
    inputName: 'password',
    inputName2: '',
    inputLabel: 'Password',
    inputLabel2: '',
    minLength: 4,
    maxLength: 15,
    isRequired: true,
    maxDate: { year: 2200, month: 1, day: 1 },
    minDate: { year: 1900, month: 1, day: 1 },
    max: 0,
    min: 0,
    hasMax: false,
    decimalPlace: 0
  }
};
