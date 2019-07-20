import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
      <div *ngIf="shouldShowErrors()">
       <ul [id]="inputId" class="list-unstyled mt-0 mb-0" >
         <li  class="text-danger" *ngFor="let error of listOfErrors()">{{error}}</li>
       </ul>
     </div>
    `
})

export class ShowErrorsComponent {

  private static readonly errorMessages: any = {
    'required': (params: any) => params.inputLabel + ' is required',
    'minlength': (params: any) => params.inputLabel + ' minimum number of characters is ' + params.requiredLength,
    'maxlength': (params: any) => params.inputLabel + ' allowed maximum number of characters is ' + params.requiredLength,
    'pattern': (params: any) => params.inputLabel + ' is invalid',
    'min': (params: any) => params.inputLabel + ' has a minimum input ' + params.minValue,
    'max': (params: any) => params.inputLabel + ' has a maximum input ' + params.maxValue,
    'years': (params: any) => params.message,
    'countryCity': (params: any) => params.message,
    'phoneNumber': (params: any) => params.inputLabel + params.message,
    'areaCodeNumber': (params: any) => params.inputLabel + params.message,
    'datePicker': (params: any) => params.inputLabel + params.message,
    'matDatepickerParse': (params: any) => params.inputLabel + ' requires DD/MM/YYYY',
    'securityQuestion': (params: any) => params.message + ' is already selected.',
    'blankInput': (params: any) => params.message,
    'confirmEmail': (params: any) => params.inputLabel + params.message,
    'ecsCentre': (params: any) => params.message
  };

  @Input()
  public control: AbstractControlDirective | AbstractControl;
  @Input()
  public inputLabel: string = '';
  @Input()
  public inputId: string = '';

  public shouldShowErrors(): boolean | any {
    let showError: boolean | any = false;
    if (this.control && this.control.errors ) {
      showError = (this.control.dirty || this.control.touched );
    }
    return showError;
  }

  public listOfErrors(): string[] | any {
    
    let errors: any = this.control.errors;
    let errObj: any;
    if (errors) {
      errObj = Object.keys(errors)
        .map((field: any) => this.getMessage(field, errors[field]));
    }
    return errObj;

  }

  private getMessage(type: string, input: any): string {
    let params = {
      inputLabel: this.inputLabel,
      requiredLength: 0,
      maxValue: 0,
      minValue: 0,
      message: ''
    }
    if (type === 'minlength' || type === 'maxlength') {
      params.requiredLength = input.requiredLength;
    }
    if (type === 'max') {
      params.maxValue = input.max;
    }
    if (type === 'min') {
      params.minValue = input.min;
    }

    params.message = input.message ? input.message : '';

    let errMsg = ShowErrorsComponent.errorMessages[type](params);
    return errMsg;
  }

}
