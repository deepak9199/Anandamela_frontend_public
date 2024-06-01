import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
const AUTH_API = BASE_URL_API + 'api/v1/get-home-page';
@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  get(menuType: number): Observable<any> {
    return this.http.post(AUTH_API, { menu_type: menuType });
  }
}
