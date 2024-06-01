import { Injectable } from '@angular/core';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable, map } from 'rxjs';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getproductdeatil(productid: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'product-details', {
      product_id: productid,
    });
  }

  getcatagorywiseproduct(menutype: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'get-category-wise-product', {
      menu_type: menutype,
    });
  }

  searchproductbyname(productname: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'search-product-by-name', {
      product_name: productname,
    });
  }

  productfiletr(categoryid: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'product-filter', {
      category_id: categoryid,
    });
  }
}
