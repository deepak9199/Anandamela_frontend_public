import { Injectable } from '@angular/core';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  constructor(private http: HttpClient) {}

  getorderhistory(): Observable<any> {
    return this.http.post<any>(AUTH_API + 'order-history', {});
  }
}
