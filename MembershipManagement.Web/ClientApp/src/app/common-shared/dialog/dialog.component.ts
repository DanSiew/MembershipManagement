import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
import { CompDirective } from 'app/common-shared/directives/comp-host.directive';
import { ComponentItem } from './component-item';
import { DialogData } from 'app/models/dialog-data';
import { DialogService } from 'app/services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styles: ['dialog.component.less']
})
export class AppDialogComponent implements OnInit {

  @ViewChild(CompDirective, {static: true}) compHost: CompDirective;

  @Input() 
  public compItem: ComponentItem | undefined;
  @Input() 
  public dialogData: DialogData | undefined;
  private componentData: any | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadComponent();

    this.dialogService.closeDialog.subscribe(
      (data: any) => {
        if (data) {
          this.onNoClick();
        }
      });
  }

  onNoClick(): void {
    this.dialogData.isOkay = false;
    this.activeModal.close(this.dialogData);
  }

  private loadComponent(): void {
    let viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentData = this.compItem.componentData;
    let componentFactoryResolver = this.compHost.componentFactoryResolver;
    let componentFactory = componentFactoryResolver.resolveComponentFactory(this.compItem.component);
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ComponentItem>componentRef.instance).componentData = this.compItem.componentData;
    
  }

 
}

