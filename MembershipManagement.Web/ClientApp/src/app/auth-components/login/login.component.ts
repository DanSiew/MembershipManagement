import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { of, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TextInputModel } from 'app/models/text-input.model';
import { SignInUpViewModel } from 'app/auth-components/models/sign-in-up-view.model';
import { DialogData } from 'app/models/dialog-data';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModel } from 'app/models/login.model';
import { LoginAction, AuthClearError } from 'app/reducer-stores/auth-module/auth/auth.actions';
import { selectUserLoading, selectLoginInfo, selectAuthError } from 'app/reducer-stores/auth-module/auth/auth.selectors';
import { User } from 'app/models/user';
import { OverlayShow, OverlayHide } from 'app/reducer-stores/generic-module/overlay/overlay.actions';
import { selectOverlay } from 'app/reducer-stores/generic-module/overlay/overlay.selectors';
import { UtilitiesService } from 'app/services/utilities.service';
import { GeneralMessageType } from 'app/models/general-message.model';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() public componentData: any | undefined;
  public dialogData: DialogData;
  public errors: string[] = [];
  public form: FormGroup;
  public textInputEmailAddress: TextInputModel = SignInUpViewModel.textInputEmailAddress;
  public textInputPassword: TextInputModel = SignInUpViewModel.textInputPassword;
  public signing: boolean = false;
  public showOverlay$: Observable<boolean> = of(false);
  private loginUser: LoginModel;
  private componentActive: boolean = true;

  constructor(
    private store: Store<AppState>,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private util: UtilitiesService) {
    this.form = this.createFrom();
  }

  ngOnInit() {
    this.dialogData = this.componentData.dialogData;
    this.loginUser = this.componentData.loginUser;

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

  public login(): void {

    if (this.form.valid && !this.signing) {
      this.errors = [];
      this.loginUser = this.form.value;
      this.signing = true;
      this.store.dispatch(new OverlayShow());

      this.store.dispatch(new LoginAction({ user: this.loginUser }));

      this.store.select(selectUserLoading)
        .pipe(takeWhile(() => this.componentActive))
        .subscribe(loading => {
          if (!loading) {
            this.store.select(selectLoginInfo)
              .subscribe((user: User) => {
                if (user && user.isAuthenticated) {
                  this.componentData.isOkay = true;
                  this.activeModal.close(this.componentData);
                  const message = 'You have been login successfully';
                  this.util.dispatchMessage('login-', message, GeneralMessageType.none);

                }
              });
            this.signing = false;
            this.store.dispatch(new OverlayHide());
          }
          
        });
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

    return this.formBuilder.group({
      emailAddress: new FormControl("", emailValidators),
      password: new FormControl("", passwordValidators)
    });
  }
}
