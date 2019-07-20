import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { TextInputModel } from 'app/models/text-input.model';

@Component({
    selector: 'app-password-input',
    templateUrl: 'password-input.component.html',
    styleUrls: ['password-input.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppPasswordInputComponent),
            multi: true
        }
    ]
})
export class AppPasswordInputComponent implements ControlValueAccessor, OnInit  {
    @Input() _value: any = '';
    @Input() textInputModel: TextInputModel;
    @Input() formControl: FormControl;
    @Input() readonly: boolean = false;
    @Input() inputLabel: string;
    placeholder: string;
    errorInputLabel: string;
    showLabel: boolean = true;
    onChange: any = () => { };
    onTouched: any = () => { };
    errorInputId: string;

    constructor() {  }

    ngOnInit(): void {
        
        if (this.textInputModel) {
            if (this.inputLabel === undefined || this.inputLabel === '') {
                this.inputLabel = this.textInputModel.inputLabel;
            }
            this.errorInputLabel = this.inputLabel;
            this.errorInputId = 'Id_' + this.textInputModel.inputName;

            if(this.textInputModel.placeholder !== undefined){
                this.placeholder = this.textInputModel.placeholder;
            }else {
                this.placeholder = this.textInputModel.inputLabel;
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
}

