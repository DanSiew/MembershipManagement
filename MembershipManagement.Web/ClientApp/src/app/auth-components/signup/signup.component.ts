import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModel } from 'app/models/signup.model';
import { DialogData } from 'app/models/dialog-data';
import { TextInputModel } from 'app/models/text-input.model';
import { SignInUpViewModel } from 'app/auth-components/models/sign-in-up-view.model';
import { selectAuthError, selectUserLoading, selectLoginInfo } from 'app/reducer-stores/auth-module/auth/auth.selectors';
import { takeWhile } from 'rxjs/operators';
import { SignUpAction, AuthClearError } from 'app/reducer-stores/auth-module/auth/auth.actions';
import { User } from 'app/models/user';
import { selectOverlay } from 'app/reducer-stores/generic-module/overlay/overlay.selectors';
import { OverlayHide, OverlayShow } from 'app/reducer-stores/generic-module/overlay/overlay.actions';
import { GeneralMessageType } from 'app/models/general-message.model';
import { UtilitiesService } from 'app/services/utilities.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less']
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() public componentData: any | undefined;
  public dialogData: DialogData;
  public errors: string[] = [];
  public form: FormGroup;
  public textInputEmailAddress: TextInputModel = SignInUpViewModel.textInputEmailAddress;
  public textInputConfirmPassword: TextInputModel = SignInUpViewModel.textInputConfirmPassword;
  public textInputPassword: TextInputModel = SignInUpViewModel.textInputPassword;
  public showOverlay$: Observable<boolean> = new Observable<boolean>();
  public signing: boolean = false;
  private signupUser: SignupModel;
  private componentActive: boolean = true;
  public signup: boolean = false;

  constructor(
    private store: Store<AppState>,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private util: UtilitiesService) {
    this.form = this.createFrom();
  }


  ngOnInit(): void {
    this.dialogData = this.componentData.dialogData;
    this.signupUser = this.componentData.signupUser;

    this.store.select(selectAuthError)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(response => {
        if (response !== undefined) {
          var errMsg = response.error.message;
          this.errors.push(errMsg);
        }
      });
    this.showOverlay$ = this.store.pipe(select(selectOverlay));
  }

  ngAfterViewInit(): void {
    this.errors = [];
    const element = document.getElementById(this.textInputEmailAddress.inputName);
    if (element) {
      element.focus();
    }
  }


  ngOnDestroy(): void {
    this.store.dispatch(new AuthClearError());
    this.componentActive = false;
  }

  public closeClick(): void {
    this.componentData.isOkay = false;
    this.activeModal.close(this.componentData);

  }

  public signUp(): void {
    if (this.form.valid && !this.signing) {
      this.errors = [];
      this.signupUser = this.form.value;
      if (this.signupUser.confirmPassword !== this.signupUser.password) {
        var errMsg = 'Password is not equal to Confirm passord';
        this.errors.push(errMsg);
      } else {
        this.signing = true;
        this.store.dispatch(new OverlayShow());

        this.store.dispatch(new SignUpAction({ signupUser: this.signupUser }));

        this.store.select(selectUserLoading)
          .pipe(takeWhile(() => this.componentActive))
          .subscribe(loading => {
            if (!loading) {
              this.store.select(selectLoginInfo)
                .subscribe((user: User) => {
                  if (user && user.isAuthenticated) {
                    this.componentData.isOkay = true;
                    this.activeModal.close(this.componentData);
                    const message = this.signupUser.emailAddress + ' has been registered successfully.';
                    this.util.dispatchMessage('signup-', message, GeneralMessageType.none);
                  }
                });
              this.signing = false;
              this.store.dispatch(new OverlayHide());

            }
          });
      }
    }

  }

  private createFrom(): FormGroup {
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
      emailAddress: new FormControl("", emailValidators),
      password: new FormControl("", passwordValidators),
      confirmPassword: new FormControl("", confirmPasswordValidators)
    });
  }

}



