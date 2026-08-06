import type { IUser } from "./user.types";

// =====================================
// NGO
// =====================================

export interface INgo {
  _id: string;

  user: IUser | string;

  organizationName: string;

  registrationNumber: string;

  ministryApproval: boolean;

  isBlocked?: boolean;

  logo?: string;

  address?: string;

  description?: string;

  website?: string;

  createdAt?: string;

  updatedAt?: string;
}


// =====================================
// NGO QUERY
// =====================================

export interface NgoQuery {
  page?: number;

  limit?: number;

  search?: string;

  sortBy?: string;

  sortOrder?:
    | "asc"
    | "desc";
}


// =====================================
// NGO STATISTICS
// =====================================

export interface NgoStatistics {
  totalNgos: number;

  activeNgos: number;

  blockedNgos: number;

  verifiedNgos: number;
}


// =====================================
// NGO USER DASHBOARD STATISTICS
// =====================================

export interface NgoDashboardStatistics {
  totalWorkshops: number;

  totalBeneficiaries: number;

  totalReports: number;

  totalDonations: number;
}
