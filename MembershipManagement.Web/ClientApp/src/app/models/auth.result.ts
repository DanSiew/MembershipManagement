export interface AuthResult {

    access_token: string;
    expires_in: string;
    refresh_token: string;
}


export class ResponseData {
  public message: string;
  public data: string;
  public sessionId: string;
  public userId: string;
  public userEmail: string;
  public isAuthenticated: boolean;

}

