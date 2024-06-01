import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient) {}
  getwishlist(): Observable<any> {
    return this.http.post<any>(AUTH_API + 'get-wishlist-product', {});
  }
  addwishlist(productid: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'add-wishlist-product', {
      product_id: productid,
    });
  }
  removewishlist(productid: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'remove-wishlist-product', {
      product_id: productid,
    });
  }
}
