import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { chnagepageModel } from 'src/app/Model/prodcutFilter';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  constructor(private http: HttpClient) {}
  getProductFilter(cetagoryId: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'product-filter', {
      category_id: cetagoryId,
    });
  }
  getProductFilterbrand(brandid: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'product-filter', {
      brand_id: brandid,
    });
  }
  SearchProduct(Name: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'product-filter', {
      search_name: Name,
    });
  }
  changepage(chnagepageModel: chnagepageModel): Observable<any> {
    return this.http.post<any>(chnagepageModel.url, chnagepageModel.data);
  }
}
