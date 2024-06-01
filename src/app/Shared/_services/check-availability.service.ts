import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class CheckAvailabilityService {
  constructor(private http: HttpClient) {}

  checkavailability(pincode: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'check-availability', {
      pincode: pincode,
    });
  }
}
