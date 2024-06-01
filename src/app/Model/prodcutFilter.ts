export interface ProductFilterApi {
  status: string;
  msg: string;
  data: ProductFilterData;
}

export interface ProductFilterData {
  products: Products;
  filter_category: FilterCategory[];
  filter_brand: FilterBrand[];
  filter_attribute: FilterAttribute[];
}

export interface Products {
  current_page: number;
  data: Daum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}
export interface Daum {
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
  rating: number;
  rating_review_count: number;
  full_default_product_image: string;
  menu_type_name: string;
  is_wishlist: string;
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

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface FilterCategory {
  id: number;
  parent_id: any;
  position: number;
  category_image: string;
  category_name: string;
  cat_slug_url: string;
  status: string;
  menu_type: string;
  created_at: string;
  updated_at: string;
  full_category_image: string;
  full_category_banner: string;
  menu_type_name: string;
}

export interface FilterBrand {
  id: number;
  brand_id: string;
  brand_name: string;
  brand_image?: string;
  brand_slug_url?: string;
  status: string;
  menu_type: string;
  created_at: string;
  updated_at: string;
  full_brand_image: string;
  menu_type_name: string;
}

export interface FilterAttribute {
  id: number;
  attribute_set_id: number;
  is_filterable: string;
  attribute_name: string;
  attribute_name_slug_url: string;
  created_at: string;
  updated_at: string;
  attribute_values: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  attribute_id: number;
  attribute_value?: string;
  created_at: string;
  updated_at: string;
}

export interface chnagepageModel {
  url: string;
  data: any;
}
