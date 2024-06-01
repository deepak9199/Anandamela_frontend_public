export interface CouponApi {
  status: string;
  mgs: string;
  data: CouponData;
}

export interface CouponData {
  payable_amount: number;
  user_coupon_map_id: number;
  coupon_id: number;
  discount_amount: number;
  total_amount: string;
}
export interface couponCode {
  coupon_code: string
  total_cart_amount: string
}
