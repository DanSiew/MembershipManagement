import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import CustomValidators from '../../forms/CustomValidators';
import {Contact} from '../../models/contact'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  model: Contact = new Contact();

  constructor() { }

fullNameToUpperCase(value: string): void {
    if (value.length > 0) {
      this.model.fullName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.fullName = value;
    }
  }

 submitForm(form: NgForm) {
  }
}