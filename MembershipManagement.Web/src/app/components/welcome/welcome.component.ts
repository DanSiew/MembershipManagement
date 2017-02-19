import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/index';

@Component({
    selector: 'welcome',
    styleUrls: ['./welcome.component.css'],
    templateUrl: './welcome.html'
})
export class WelcomeComponent implements OnInit {
    user: User;
    errorMessage: string;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUser();
    }
    
    getUser() {
        this.userService.getUsers()
            .subscribe(data => this.user = data,
                      error => this.errorMessage = error);
    }
}