import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from 'rxjs';
import { AuthService } from 'app/auth-components/services/auth.service';
import { TextInputModel } from 'app/models/text-input.model';
import { SignInUpViewModel } from 'app/auth-components/models/sign-in-up-view.model';
import { DialogData } from 'app/models/dialog-data';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModel } from 'app/models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less']
})
export class LoginComponent implements OnInit {
  @Input() public componentData: any | undefined;
  public dialogData: DialogData;
  public errors: string[] = [];
  public form: FormGroup;
  public textInputEmailAddress: TextInputModel = SignInUpViewModel.textInputEmailAddress;
  public textInputPassword: TextInputModel = SignInUpViewModel.textInputPassword;
  private loginUser: LoginModel;

  messagePerErrorCode = {
    loginfailed: "Invalid credentials"
  };


  constructor(
    private authService: AuthService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
    this.form = this.createFrom();
  }

  ngOnInit() {
    this.dialogData = this.componentData.dialogData;
    this.loginUser = this.componentData.loginUser;

  }

  public closeClick(): void {
    this.componentData.isOkay = false;
    this.activeModal.close(this.componentData);


  }

  public login(): void {

    this.loginUser = this.form.value;
    if (this.loginUser.emailAddress && this.loginUser.password) {

      this.authService.login(this.loginUser.emailAddress, this.loginUser.password)
        .subscribe(
          () => {
            this.componentData.isOkay = true;
            this.activeModal.close(this.componentData);
            console.log("User is login successfully");
          },
          (response: any) => {
            var errMsg = response.error.error.message;
            this.errors.push(errMsg);

            console.log("response", response);

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

    return this.formBuilder.group({
      emailAddress: new FormControl("test@gmail.com", emailValidators),
      password: new FormControl("Password10", passwordValidators)
    });
  }
}
