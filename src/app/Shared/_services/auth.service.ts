import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiloginData, login } from 'src/app/Model/login';
import { signup } from 'src/app/Model/signup';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { TokenStorageService } from './token-storage.service';
import { optvarification } from 'src/app/Model/otpvarification';
import { resetpassword } from 'src/app/Model/resetpassword';
import { updatepassword } from 'src/app/Model/updatepassword';
const AUTH_API = BASE_URL_API + 'api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
  ) { }

  login(credentials: login): Observable<any> {
    return this.http.post<any>(AUTH_API + 'user-login', credentials).pipe(map((data: ApiloginData) => {
      console.log(data)
      if (data.msg == "Login Successfull") {
        this.tokenStorage.saveToken(data.data.user_details.api_token)
      }
      return data;
    }));
  }

  logout(): Observable<any> {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.tokenStorage.signOut();
    return this.http.post(AUTH_API + 'logout', {});

  }

  register(user: signup): Observable<any> {
    // console.log(user)
    return this.http.post(AUTH_API + 'registration', user);
  }

  otpvarification(otpvarification: optvarification): Observable<any> {
    // console.log(user)
    return this.http.post(AUTH_API + 'otp-verification', otpvarification);
  }

  forgetpassword(email: string): Observable<any> {
    // console.log(user)
    return this.http.post(AUTH_API + 'forgot-password', { email: email });
  }

  resetpassword(resetpass: resetpassword): Observable<any> {
    // console.log(user)
    return this.http.post(AUTH_API + 'save-reset-password', resetpass);
  }

  updatepassword(updatepass: updatepassword): Observable<any> {
    // console.log(user)
    return this.http.post(AUTH_API + 'update-password', updatepass);
  }
}
