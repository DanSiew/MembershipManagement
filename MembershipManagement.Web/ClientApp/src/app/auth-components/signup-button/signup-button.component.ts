import { Component, Input, Inject, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DialogData, DialogType } from 'app/models/dialog-data';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppDialogComponent, ComponentItem } from 'app/common-shared';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { SignupComponent } from 'app/auth-components';
import { SignupModel } from 'app/models/signup.model';

@Component({
  selector: 'app-signup-button',
  templateUrl: 'signup-button.component.html',
  styleUrls: ['signup-button.component.less']
})

export class SignupButtonComponent implements OnInit, OnDestroy {

  private userId: number;
  private componentActive: boolean = true;
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

  public signUp(event): void {
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
      title: 'Register',
      buttonCloseText: 'Close',
      buttonOkText: 'Save',
      isOkay: false,
      dialogType: DialogType.signup
    };

    const componentData = {
      dialogData: dialogData,
      signupUser : new SignupModel()
    };
    const compItem = new ComponentItem(SignupComponent, componentData);

    const modalRef = this.modalService.open(AppDialogComponent, options);
    modalRef.componentInstance.dialogData = dialogData;
    modalRef.componentInstance.compItem = compItem;
    modalRef.result.then((result: any) => {
      if (result && result.dialogData) {
        if (result.dialogData.isOkay && result.signupUser.id > 0) {
          console.log('result', result);
        }
      }
    });
  }

 
}



