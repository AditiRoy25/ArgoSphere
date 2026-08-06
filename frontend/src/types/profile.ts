export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  profileImage: string;
  address: string;
  district: string;
  state: string;
  isEmailVerified: boolean;
  status: "active" | "blocked";
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  profile: UserProfile;
}

export interface UpdateProfilePayload {
  gender: string;
  address: string;
  district: string;
  state: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: UserProfile;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}