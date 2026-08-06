export type UserRole =""
  | "farmer"
  | "ngo"
  | "officer"
  | "ministry"
  | "admin";

export type Gender =
  | "male"
  | "female"
  | "other";

export interface IUser {
  _id: string;

  name: string;
  email: string;
  phone: string;

  image: string;
  public_id: string;

  role: UserRole;
  gender: Gender;

  address: string;
  district: string;
  state: string;

  isVerified: boolean;
  isBlocked: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isBlocked?: boolean;
}