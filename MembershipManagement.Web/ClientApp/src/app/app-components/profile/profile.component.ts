import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.less']
})

export class ProfileComponent implements OnInit, OnDestroy {

  public imageUrl: string;

  constructor( ) {
  }

  ngOnInit() {

    this.imageUrl = './asset/images/ic_person_48px.svg';

  }

  ngOnDestroy(): void {
  }


}
