export interface wishListApi {
  status: string;
  msg: string;
  data: WishListData;
}
export interface WishListData {
  wishlist_products: WishlistProduct[];
}

export interface WishlistProduct {
  id: number;
  customer_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
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
  product_description: any;
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
