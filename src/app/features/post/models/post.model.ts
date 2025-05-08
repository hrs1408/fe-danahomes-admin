export interface Image {
  id: number;
  file_name: string;
  drive_id: string;
  file_type: string;
  parent_id: number;
  product_detail_id: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  post_type: string;
  active: string;
  image_id: number;
  image: Image;
}

export interface PostResponse {
  data: Post;
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}

export interface PostListResponse {
  data: Post[];
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}
