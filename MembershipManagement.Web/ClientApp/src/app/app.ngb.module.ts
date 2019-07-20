import { NgModule } from '@angular/core';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModalModule,
  NgbTabsetModule,
  NgbDropdownModule,
  NgbDatepickerModule,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbModule
  ],
  exports: [
    NgbPaginationModule,
    NgbAlertModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbModule
  ]
})

export class AppNgbModule { }
