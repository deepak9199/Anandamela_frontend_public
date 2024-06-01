import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
  ) { }

  getbanner(menuType: number): Observable<any> {
    return this.http.post(AUTH_API + 'get-banners', { menu_type: menuType });
  }
}
