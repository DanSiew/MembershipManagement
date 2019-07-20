import { Component, Input, Inject, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DialogData, DialogType } from 'app/models/dialog-data';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppDialogComponent, ComponentItem } from 'app/common-shared';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { LoginComponent } from 'app/auth-components';
import { LoginModel } from 'app/models/login.model';

@Component({
  selector: 'app-login-button',
  templateUrl: 'login-button.component.html',
  styleUrls: ['login-button.component.less']
})

export class LoginButtonComponent implements OnInit, OnDestroy {

  private userId: number;
  private componentActive: boolean = true;
  public saving: boolean = false;
  public messages: string[] = [];

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    @Inject('CONSTANT') private constant: any,
    @Inject('LOCALSTORAGE') private localStorage: any) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public login(event): void {

    this.openDialog();
  }

  public openDialog(): void {
    this.messages = [];
    const options: NgbModalOptions = {
      backdrop: false,
      keyboard: false,
      size: 'sm',
      ariaLabelledBy: "lblModalTitle"
    };

    const dialogData: DialogData = {
      title: 'Login',
      buttonCloseText: 'Close',
      buttonOkText: 'Sign in',
      isOkay: false,
      dialogType: DialogType.login
    };

    const componentData = {
      dialogData: dialogData,
      loginUser: new LoginModel()
    };
    const compItem = new ComponentItem(LoginComponent, componentData);

    const modalRef = this.modalService.open(AppDialogComponent, options);
    modalRef.componentInstance.dialogData = dialogData;
    modalRef.componentInstance.compItem = compItem;
    modalRef.result.then((result: any) => {
      if (result && result.dialogData) {
        if (result.dialogData.isOkay && result.loginUser.id > 0) {
        }
      }
    });
  }

 
}



