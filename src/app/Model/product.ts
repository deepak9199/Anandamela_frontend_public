export interface ProductApi {
  status: string;
  msg: string;
  data: ProductData;
}

export interface ProductData {
  product: Product;
  similar_products: SimilarProduct[];
  offers: Offer[];
  ratings: number;
  review: Review[];
  rating_review_count: number;
}

export interface Product {
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
  is_wishlist: string;
  product_images: ProductImage[];
  product_attributes: ProductAttribute[];
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

export interface ProductAttribute {
  id: number;
  product_id: number;
  attribute_id: number;
  attribute_value_id: number;
  created_at: string;
  updated_at: string;
  attribute_name: string;
  attribute_name_slug_url: string;
  attribute_value: string;
}

export interface SimilarProduct {
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
  default_product_image: any;
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

export interface Review {
  id: number;
  customer_id: number;
  product_id: number;
  ratig: number;
  review: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
export interface Offer {
  id: number;
  offer_name: string;
  created_at: string;
  updated_at: string;
}

// catagory waise product page

export interface CetagoryWiseProductPageApi {
  status: string;
  msg: string;
  data: CetagoryWiseProductPageData;
}

export interface CetagoryWiseProductPageData {
  featured_products: FeaturedProduct[];
  trending_products: TrendingProduct[];
  category_products: CategoryProduct[];
}

export interface FeaturedProduct {
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

export interface TrendingProduct {
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
  product_images: ProductImage2[];
}

export interface ProductImage2 {
  id: number;
  product_id: number;
  product_image: string;
  original_name: string;
  created_at: string;
  updated_at: string;
  full_product_image: string;
}

export interface CategoryProduct {
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
  menu_type_name: string;
  products: CategoryProductData[];
}

export interface CategoryProductData {
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
  default_product_image: any;
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
