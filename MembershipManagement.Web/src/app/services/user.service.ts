import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/api/users', options)
            .map(this.extractUser)
            .catch(this.handleError);
    }

    private extractUser(res: Response): any {
        let data = res.json();
        console.log('data', data);
        return data || {};
    }

    private handleError(error: Response): any {
        console.error('error: ', error);
        return Observable.throw(error.statusText);
    }
}