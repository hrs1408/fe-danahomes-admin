export interface UserInformation {
  full_name: string;
  phone_number: string;
  address: string;
  dob: string;
  id: number;
  user_id: number;
}

export interface UserProfile {
  id: number;
  email: string;
  user_role: string;
  is_active: boolean;
  user_information: UserInformation;
}

export interface ChangeProfileRequest {
  full_name: string;
  phone_number: string;
  address: string;
  dob: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface UserProfileResponse {
  data: UserProfile;
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}
