import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import {
  AddToCartModel,
  DeleteCartModel,
  UpdateCartQuantityModel,
  saveforlatermodel,
} from 'src/app/Model/cart';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getcartList(): Observable<any> {
    return this.http.post<any>(AUTH_API + 'get-cart-list', {});
  }

  addtocart(obj: AddToCartModel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'add-to-cart', obj);
  }

  updatecartquantity(obj: UpdateCartQuantityModel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'update-cart-quantity', obj);
  }
  deletecart(obj: DeleteCartModel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'delete-cart', obj);
  }
  addtosaveforlater(obj: saveforlatermodel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'save-for-later', obj);
  }
  movetocart(obj: saveforlatermodel): Observable<any> {
    return this.http.post<any>(AUTH_API + 'move-to-cart', obj);
  }
}
