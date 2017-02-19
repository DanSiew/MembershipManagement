import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/index';


@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.html',
})

export class NavbarComponent implements OnInit {
    public user: User;
    public errorMessage: string;
    public isAuthenticated: boolean = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        let currentUser = localStorage.getItem('currentUser');

        if (currentUser) {
            this.isAuthenticated = true;
        }
    }
    
    
}