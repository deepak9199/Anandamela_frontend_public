export interface BrandApi {
  status: string;
  msg: string;
  data: BrandData;
}

export interface BrandData {
  brands: Brand[];
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
