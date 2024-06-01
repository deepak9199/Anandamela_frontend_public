export interface categoriesApi {
  status: string;
  msg: string;
  data: CategoryData;
}

export interface CategoryData {
  category: Category[];
}

export interface Category {
  id: number;
  parent_id: any;
  position: number;
  category_image?: string;
  category_name: string;
  cat_slug_url: string;
  status: string;
  menu_type: string;
  created_at: string;
  updated_at: string;
  full_category_image: string;
  menu_type_name: string;
}
