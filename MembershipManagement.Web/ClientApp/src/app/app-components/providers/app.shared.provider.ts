import { AppConstant } from "app/app-components/providers/app.shared.constant";
import { environment } from '../../../environments/environment.prod';
import { InjectionToken } from "@angular/core";

export const APP_VERSION = new InjectionToken<string>('APP_VERSION');

export class SharedProvider {

  static getConstants() {
    let appConstant: any = AppConstant;
    return appConstant;
  }


  static getLocalStorage() {
    return (typeof window !== "undefined") ? window.localStorage : null;
  }

  static getAppVersionIdentifier() {
    return environment.version;
  }

  static getClients() {
    return {
      code: '1001',
      secret: 'ClientSecret1',
      grantType: 'password'
    };
  }
}
