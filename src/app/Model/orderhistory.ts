export interface OrderHistoryApi {
  status: string;
  msg: string;
  data: OrderHistoryData;
}

export interface OrderHistoryData {
  order_history: OrderHistory[];
}

export interface OrderHistory {
  id: number;
  order_no: string;
  customer_id: number;
  address_id: number;
  user_coupon_map_id: any;
  cart_amount: number;
  delivery_charge: number;
  coupon_discount_amount: any;
  payable_amount: number;
  payment_mode: string;
  is_paid: string;
  tid?: string;
  tracking_id: any;
  bank_ref_no: any;
  payment_details: any;
  order_status: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  order_details_count: number;
  order_status_name: string;
  order_details: OrderDetail[];
  order_status_log: OrderStatusLog[];
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  unit_price: number;
  quantity: number;
  line_total_price: number;
  created_at: string;
  updated_at: string;
  status: string;
  product_details: ProductDetails;
}

export interface ProductDetails {
  id: number;
  category_id: number;
  sub_category_id: number;
  product_api_id: string;
  brand_id: number;
  brand_name: string;
  class_id: number;
  class_name: string;
  group_id: number;
  group_name: string;
  unit_id: number;
  unit_name: string;
  gst_id: number;
  gst_price: number;
  product_name: string;
  product_slug_url: string;
  default_product_image: string;
  product_description?: string;
  mrp_price: number;
  offer_price: number;
  stock: number;
  status: string;
  menu_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  full_default_product_image: string;
  menu_type_name: string;
  is_wishlist: string;
}

export interface OrderStatusLog {
  id: number;
  order_id: number;
  order_status_id: number;
  added_by: number;
  created_at: string;
  updated_at: string;
  order_status_text: string;
}
