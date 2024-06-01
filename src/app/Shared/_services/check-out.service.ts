import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { CheckOutModel } from 'src/app/Model/checkout';
import { AddAddressModel, DeleteAddressModel } from 'src/app/Model/address';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  checkout(obj: CheckOutModel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'order-save', obj);
  }

  addaddress(obj: AddAddressModel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'add-address', obj);
  }

  getaddress(): Observable<any> {
    return this.http.post<any>(AUTH_API + 'get-address', {});
  }

  deleteaddress(obj: DeleteAddressModel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'remove-address', obj);
  }
}
