export interface SubCategory {
  id: number;
  purchase_group_id: number;
  purchase_category_id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  purchase_group_id: number;
  name: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
  sub_categories: SubCategory[];
}

export interface Group {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  categories: Category[];
}

export interface Item {
  id: number;
  purchase_group_id: number;
  purchase_category_id: number;
  purchase_sub_category_id: number | null;
  unit_id: number;
  full_name: string;
  name: string;
  description: string | null;
  price: number;
  cost_price: number;
  code: string;
  barcode: string;
  brand_id: number | null;
  stock: number;
  size_id: number;
  color_id: number | null;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantApiResponse {
  group: Group[];
  categories: Category[];
  subCategories: SubCategory[];
  items: Item[];
  message: string;
  count: number;
}

// Query parameters
export interface RestaurantQueryParams {
  lang?: string;
  group_id?: number;
  category_id?: number;
  search?: string;
  page?: number;
  limit?: number;
}
