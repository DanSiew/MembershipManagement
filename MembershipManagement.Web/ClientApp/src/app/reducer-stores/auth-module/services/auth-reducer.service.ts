import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { AuthResult, ResponseData } from "app/models/auth.result";
import { User } from "app/models/user";
import { map, filter, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';


export const ANONYMOUS_USER: User = {
  id: '',
  email: '',
  isAuthenticated: false
}

@Injectable()
export class AuthReducerService {

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);
  private data: AuthResult;

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => user.isAuthenticated));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(
    private http: HttpClient,
    @Inject('CLIENT') private client: any,
    @Inject('CONSTANT') private constant: any,
    @Inject('LOCALSTORAGE') private localStorage: any) {
  }


  public signUp(email: string, password: string): Observable<ResponseData> {

    var membershipUser = {
      email: email,
      password: password,
      clientCode: this.client.code,
      clientSecret: this.client.secret,
      roleCode: 1
    };
    return this.http.post<any>('/api/signup', membershipUser);
  }

  public getUser(): Observable<User> {
    if (this.localStorage === null) {
      return of(ANONYMOUS_USER);
    }
    const accessToken = this.localStorage.getItem('token');
    if (accessToken && accessToken != null) {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
      });
      headers.set(this.constant.config.contentType, this.constant.config.applicationXform)
      let options = {
        headers: headers
      };
      return this.http.get<User>('/api/users', options);
    }
    else {
      return of(ANONYMOUS_USER);
    }
  }


  public login(username: string, password: string): Observable<ResponseData> {
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
    return this.http.post<any>(this.constant.api.tokenAuth, this.toHttpParams(parmeters), options);

  }


  public logout(): void {
    this.localStorage.clear();
  }

  private toHttpParams(obj: any): HttpParams {
    return Object.getOwnPropertyNames(obj)
      .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
  }

}

