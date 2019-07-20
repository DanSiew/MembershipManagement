import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModel } from 'app/models/signup.model';
import { DialogData } from 'app/models/dialog-data';
import { TextInputModel } from 'app/models/text-input.model';
import { SignInUpViewModel } from 'app/auth-components/models/sign-in-up-view.model';
import { AuthService } from 'app/auth-components/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {

  @Input() public componentData: any | undefined;
  public dialogData: DialogData;
  public errors: string[] = [];
  public form: FormGroup;
  public textInputEmailAddress: TextInputModel = SignInUpViewModel.textInputEmailAddress;
  public textInputConfirmPassword: TextInputModel = SignInUpViewModel.textInputConfirmPassword;
  public textInputPassword: TextInputModel = SignInUpViewModel.textInputPassword;
  public showOverlay$: Observable<boolean> = new Observable<boolean>();
  private signupUser: SignupModel;

  constructor(
    private authService: AuthService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
    this.form = this.createFrom();
  }


  ngOnInit(): void {
    console.log('componentData', this.componentData);
    this.dialogData = this.componentData.dialogData;
    this.signupUser = this.componentData.signupUser;
  }

  ngOnDestroy(): void {
  }

  public closeClick(): void {
    this.componentData.isOkay = false;
    this.activeModal.close(this.componentData);

  }

  public signUp(): void {
    this.signupUser = this.form.value;
    this.errors = [];
    if (this.signupUser.emailAddress && this.signupUser.password && this.signupUser.password === this.signupUser.confirmPassword) {

      this.authService.signUp(this.signupUser.emailAddress, this.signupUser.password)
            .subscribe(
              () => {
                this.componentData.isOkay = true;
                this.activeModal.close(this.componentData);
                console.log("User created successfully");
            },
            response => {
                var errMsg = response.error.error.message;
                this.errors.push(errMsg);
            });

    }


  }

  public createFrom(): FormGroup {
    let emailPattern = '^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$';
    let emailValidators = [
      Validators.required,
      Validators.pattern(emailPattern),
      Validators.minLength(SignInUpViewModel.textInputEmailAddress.minLength),
      Validators.maxLength(SignInUpViewModel.textInputEmailAddress.maxLength)];

    let passwordValidators = [
      Validators.required,
      Validators.minLength(SignInUpViewModel.textInputPassword.minLength),
      Validators.maxLength(SignInUpViewModel.textInputPassword.maxLength)];

    let confirmPasswordValidators = [
      Validators.required,
      Validators.minLength(SignInUpViewModel.textInputConfirmPassword.minLength),
      Validators.maxLength(SignInUpViewModel.textInputConfirmPassword.maxLength)];

    return this.formBuilder.group({
      emailAddress: new FormControl("test@gmail.com", emailValidators),
      password: new FormControl("Password10", passwordValidators),
      confirmPassword: new FormControl("Password10", confirmPasswordValidators)
    });
  }

}



