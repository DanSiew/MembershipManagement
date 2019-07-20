import { Component, Input, forwardRef, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { TextInputModel } from 'app/models/text-input.model';

@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['text-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTextInputComponent),
      multi: true
    }
  ]
})

export class AppTextInputComponent implements ControlValueAccessor, OnInit {
  @Input() textInputModel: TextInputModel;
  @Input() formControl: FormControl;
  @Input() readonly: boolean = false;
  @Input() disable: boolean = false;
  @Input() inputLabel: string;
  placeholder: string;
  errorInputLabel: string;
  showLabel: boolean = true;
  errorInputId: string;
  _value: any = '';

  constructor( ) { }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    this.formControl.markAsPristine();
    this.formControl.markAsUntouched();

    if (this.textInputModel) {
      if (this.inputLabel === undefined || this.inputLabel === '') {
        this.inputLabel = this.textInputModel.inputLabel;
      }
      this.errorInputLabel = this.inputLabel;
      this.errorInputId = 'Id_' + this.textInputModel.inputName;

      if(this.readonly){
        this.placeholder = " ";
      }
      else{
        if (this.textInputModel.placeholder !== undefined) {
          this.placeholder = this.textInputModel.placeholder;
        } else {
          this.placeholder = this.textInputModel.inputLabel;
        }
  
      }
     
      if (this.textInputModel.showLabel !== undefined) {
        this.showLabel = this.textInputModel.showLabel;
      }
    }

  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    } else {
      if (this.formControl.dirty || this.formControl.touched) {
        this.value = '';
      }
    }
  }

  validate: any = {
    isErrorState: () => {
      let showError: boolean | any;
      if (this.formControl && this.formControl.errors) {
        showError = (this.formControl.dirty || this.formControl.touched);
      }
      return showError;
    }
  };

  setRequired(): boolean {
    return this.textInputModel.isRequired;
  }

  public onBlur($event: any) {
    if (this.textInputModel.toTitleCase) {
      this.value = this.toTitleCase(this.value);
    }
    this.formControl.markAsTouched();
  }

  private toTitleCase(input: string): string {
    return input.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

}

