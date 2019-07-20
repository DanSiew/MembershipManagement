import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { AuthResult } from "app/models/auth.result";
import { User } from "app/models/user";
import { map, filter, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


export const ANONYMOUS_USER: User = {
  id: '',
  email: '',
  isAuthenticated: false
}

@Injectable()
export class AuthService implements OnInit {

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);
  private data: AuthResult;

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => user.isAuthenticated));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
  showLogin$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    @Inject('CLIENT') private client: any,
    @Inject('CONSTANT') private constant: any,
    @Inject('LOCALSTORAGE') private localStorage: any) {
  }

  ngOnInit() {

  }

  public signUp(email: string, password: string) {

    var membershipUser = {
      email: email,
      password: password,
      clientCode: this.client.code,
      roleCode: 1
    }

    return this.http.post<any>('/api/signup', membershipUser)
      .pipe(map(response => {
        let data = JSON.parse(response.data);
        this.localStorage.setItem('token', data.access_token);
        let user: User = response.membershipUserDtos;
        this.subject.next(user);
      }));

  }

  public getUser(): void {
    if (this.localStorage === null) {
      this.subject.next(ANONYMOUS_USER);
      return;
    }
    let accessToken = this.localStorage.getItem('token');
    if (accessToken != null) {
      let contentType = this.constant.config.contentType;
      let applicationXform = this.constant.config.applicationXform;

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
      });
      headers.set(this.constant.config.contentType, this.constant.config.applicationXform)
      let options = {
        headers: headers
      };

      this.http.get<User>('/api/users', options)
        //.do(console.log)
        .subscribe(user => {
          this.subject.next(user ? user : ANONYMOUS_USER);
        }
          , error => {
            console.error(error);
            this.subject.next(ANONYMOUS_USER);
          });

    } else {
      this.subject.next(ANONYMOUS_USER);
    }
  }


  public login(username: string, password: string): any {
    let parmeters = {
      refresh_token: '',
      grant_type: this.client.grantType,
      client_code: this.client.code,
      client_secret: this.client.secret,
      username: username,
      password: password
    };

    let options = {
      headers: new HttpHeaders().set(this.constant.config.contentType, this.constant.config.applicationXform)
    };

    return this.http.post<any>(this.constant.api.tokenAuth, this.toHttpParams(parmeters), options)
      .pipe(map(response => {
        console.log('response', response);
        let data = JSON.parse(response.data);
        this.localStorage.setItem('token', data.access_token);
        let user: User = {
          id: response.userId,
          email: username,
          isAuthenticated: true
        };
        this.subject.next(user);
      }));
  }


  public logout(): void {

    this.localStorage.clear();
    this.subject.next(ANONYMOUS_USER)
    this.http.post('/api/logout', null)
        .pipe(tap(user => this.subject.next(ANONYMOUS_USER)));

  }

  private toHttpParams(obj: any): HttpParams {
    return Object.getOwnPropertyNames(obj)
      .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
  }

}

