export interface ImageDetail {
  id: number;
  file_name: string;
  drive_id: string;
  file_type: string;
  parent_id: number | null;
  product_detail_id: number | null;
}

export interface Introduction {
  id: number;
  title: string;
  content: string;
  active: string;
  image_id: number;
  image: ImageDetail;
}

export interface IntroductionResponse {
  data: Introduction;
  meta: {
    error: boolean;
    message: string | null;
  };
  status_code: number;
}

export interface UpdateIntroductionDto {
  title: string;
  content: string;
  active: string;
  image: File;
}
