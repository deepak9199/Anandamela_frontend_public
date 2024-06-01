import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../_baseUrl/baseUrl';
import { couponCode } from 'src/app/Model/coupon';
const AUTH_API = BASE_URL_API + 'api/v1/';
@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  getCoupon(coupon: couponCode): Observable<any> {
    return this.http.post<any>(AUTH_API + 'apply-coupon', coupon);
  }
  removeCoupon(user_coupon_map_id: number): Observable<any> {
    return this.http.post<any>(AUTH_API + 'remove-coupon', {
      user_coupon_map_id: user_coupon_map_id,
    });
  }
}
