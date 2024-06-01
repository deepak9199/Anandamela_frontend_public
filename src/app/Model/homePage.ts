export interface HomePageApi {
  status: string;
  msg: string;
  data: HomePageData;
}

export interface HomePageData {
  banners: Banner[];
  brands: Brand[];
  category: Category[];
  featured_products: FeaturedProduct[];
  trending_products: TrendingProduct[];
  category_products: CategoryProduct[];
  home_page: HomePage[];
}

export interface Banner {
  id: number;
  banner_image: string;
  category_id: number;
  status: string;
  menu_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  full_banner_image: string;
  menu_type_name: string;
}

export interface Brand {
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

export interface Category {
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
  full_category_banner: string;
  menu_type_name: string;
  products: Product[];
}

export interface Product {
  id: number;
  category_id: number;
  sub_category_id?: number;
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
  product_slug_url?: string;
  default_product_image?: string;
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

export interface HomePage {
  id: number;
  master_name: string;
  menu_type_image: string;
  menu_type_name: string;
  title_or_image: string;
  created_at: string;
  updated_at: string;
  full_menu_type_image: string;
  menu_items: HomePageMenuItem[];
}

export interface HomePageMenuItem {
  id: number;
  home_menu_type_id: number;
  product_id?: number;
  menu_type_image?: string;
  sub_menu_type_image?: string;
  menu_item_title?: string;
  menu_item_sub_title?: string;
  category_id?: number;
  sub_category_id: any;
  created_at: string;
  updated_at: string;
  full_menu_type_image: string;
  full_sub_menu_type_image: string;
  product_details?: ProductDetails;
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
  default_product_image?: string;
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
