import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenericService implements OnInit {
  

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit(): void {}

  public get(actionPath: string, options: any) {
    return this.http.get(this.baseUrl + actionPath, options);
  }

  public query(actionPath: string, options: any, dataRequest: any) {
    return this.http.post(this.baseUrl + actionPath, dataRequest, options);
  }

  public post(payload: any, actionPath: string, options: any) {
    return this.http.post(this.baseUrl + actionPath, payload, options);
  }

  public remove(payload: any, actionPath: string, options: any) {
    return this.http.delete(this.baseUrl + actionPath + '/' + payload.id, options);
  }
  public postFile(payload: any, actionPath: string, options: any) {
    return this.http.post(this.baseUrl + actionPath, payload, options);
  }

  public update(payload: any, actionPath: string,  options: any) {
   return this.http.put(this.baseUrl + actionPath + '/' + payload.id, payload, options);
  }

}

