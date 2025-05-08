export interface AddressDetail {
  id?: number;
  address: string;
  province: string;
  district: string;
  ward: string;
  google_address_link: string;
}

export interface ProductDetail {
  id?: number;
  bedroom: number;
  bathroom: number;
  area: number;
  price: number;
  price_to: number;
  content: string;
  type_product: string;
  investor: string;
  project_type: string;
  project_status: string;
  type_of_investment: string;
  eletric_price: number;
  water_price: number;
  internet_price: number;
  utilities: string;
  interiol: string;
}

export interface Tag {
  id: number;
  slug: string;
  name: string;
  color: string;
}

export interface Image {
  id: number;
  file_name: string;
  drive_id: string;
  file_type: 'cover' | 'product';
  parent_id: number;
  product_detail_id: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  address_detail: AddressDetail;
  product_detail: ProductDetail;
  tag: Tag[];
  images: Image[];
}

export interface ProductRequest {
  name: string;
  slug: string;
  address_detail: AddressDetail;
  product_detail: ProductDetail;
  tag_ids: number[];
}

export interface ProductResponse {
  data: Product;
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}

export interface ProductListResponse {
  data: Product[];
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}
