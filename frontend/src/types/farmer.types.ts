import type { IUser } from "./user.types";

export interface IFarmer extends IUser {
  // The profile endpoint uses profileImage while the farmers endpoint uses image.
  profileImage?: string;
}

export interface FarmerQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: "active" | "blocked";
  verified?: boolean;
}

export interface FarmerStatistics {
  totalFarmers: number;
  verifiedFarmers: number;
  blockedFarmers: number;
  activeFarmers: number;
}
