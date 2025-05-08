export interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface TagResponse {
  success: boolean;
  message: string;
  data: Tag;
}

export interface TagListResponse {
  success: boolean;
  message: string;
  data: Tag[];
}

export interface TagRequest {
  name: string;
  slug: string;
  color: string;
}
