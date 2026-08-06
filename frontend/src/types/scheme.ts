export interface GovernmentScheme {
  _id: string;

  title: string;

  description: string;

  category: string;

  state: string;

  amount: number;

  eligibility: string;

  lastDate: string;

  image?: string;

  status: "Active" | "Closed";

  createdAt: string;

  updatedAt: string;
}

export interface Pagination {
  total: number;

  page: number;

  limit: number;

  totalPages: number;
}


export interface SchemeApplication {
  _id: string;
  scheme: GovernmentScheme;
  status: "Pending" | "Approved" | "Rejected";
   createdAt: string;

  updatedAt: string;
}

export interface GovernmentSchemesResponse {
  success: boolean;
  message: string;
  schemes: GovernmentScheme[];
  pagination: Pagination;
  
}

export interface GovernmentSchemeResponse {
  success: boolean;
  message: string;
  scheme: GovernmentScheme;
  
}

export interface ApplySchemePayload {
  schemeId: string;
}

export interface SchemeApplicationResponse {
  success: boolean;
  message: string;
  application: SchemeApplication;
}

export interface MySchemesResponse {
  success: boolean;
  message: string;
  applications: SchemeApplication[];
}

/* ============================
   Admin Payloads
============================ */

// export interface CreateSchemePayload {
//   title: string;
//   description: string;
//   amount: number;
//   eligibility: string;
//   lastDate: string;
//   status: "Active" | "Closed";
//   image?: File | string;
// }

export interface CreateSchemePayload {
  title: string;

  description: string;

  category: string;

  state: string;

  amount: number;

  eligibility: string;

  lastDate: string;

  image?: string;

  status?: "Active" | "Closed";
}

export type UpdateSchemePayload =
  Partial<CreateSchemePayload>;
/* ============================
   Query Params
============================ */

// export interface SchemeQuery {
//   page?: number;
//   limit?: number;
//   search?: string;
//   status?: "Active" | "Closed";
// }

export interface SchemeQuery {
  search?: string;
  category?: string;
  state?: string;
  eligibility?: string;

  page?: number;
  limit?: number;
}