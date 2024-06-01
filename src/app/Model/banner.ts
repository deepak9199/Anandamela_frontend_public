export interface ApibannerData {
  status: string;
  msg: string;
  data: Data;
}

export interface Data {
  banners: Banner[];
}

export interface Banner {
  id: number;
  banner_image: string;
  banner_url: string;
  status: string;
  menu_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  full_banner_image: string;
  menu_type_name: string;
  category_id: string;
}
