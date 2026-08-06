

export interface CategoryReport {
  _id: string;
  totalProducts: number;
}

export interface CategoryReportResponse {
  success: boolean;
  report: CategoryReport[];
}

export interface TopSellingProduct {
  _id: string;
  name: string;
  totalSold: number;
}

export interface TopSellingResponse {
  success: boolean;
  products: TopSellingProduct[];
}

export interface RevenueReportResponse {
  success: boolean;
  totalRevenue: number;
  totalOrders: number;
}