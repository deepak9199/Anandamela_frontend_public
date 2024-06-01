export interface cartApi {
  status: string;
  msg: string;
  data: CartData;
}

export interface CartData {
  cart_list: CartList[];
  save_later_list: SaveLaterList[];
  item_total: number;
  delivery_charge: number;
  grand_total: number;
}
export interface SaveLaterList {
  id: number;
  cart_type: string;
  customer_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product_details: ProductDetails;
}
export interface CartList {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  price: number;
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
  product_description: string;
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
  product_images: ProductImage[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  product_image: string;
  original_name: string;
  created_at: string;
  updated_at: string;
  full_product_image: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  product_image: string;
  original_name: string;
  created_at: string;
  updated_at: string;
  full_product_image: string;
}

export interface AddToCartModel {
  product_id: string;
  quantity: string;
}

export interface UpdateCartQuantityModel {
  cart_id: string;
  quantity: string;
}
export interface DeleteCartModel {
  cart_id: string;
}

export interface saveforlatermodel {
  cart_id: string;
}
