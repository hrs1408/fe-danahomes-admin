export interface Information {
  id?: number;
  address: string;
  hotline: string;
  email: string;
  facebook: string;
  twitter: string;
  google: string;
  zalo: string;
}

export interface InformationResponse {
  data: Information;
  meta: {
    error: boolean;
    message: string | null;
  };
  status_code: number;
}
