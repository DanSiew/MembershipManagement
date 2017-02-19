import { Component} from '@angular/core';
import { AuthenticationService } from './services/index';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app',
  templateUrl: './app.html',
})

export class AppComponent {

    constructor(private authService: AuthenticationService) {
        console.log(this.authService.isAuthenticated);

    }


   
}
