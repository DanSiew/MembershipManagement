import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) { }

    ngOnInit() {
 
    }

}