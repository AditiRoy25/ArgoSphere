export interface DashboardSummary {
  totalFarms: number;
  totalCrops: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface DashboardSummaryResponse {
  success: boolean;
  summary: DashboardSummary;
}

export interface RecentActivity {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface RecentActivityResponse {
  success: boolean;
  activities: RecentActivity[];
}

export interface CropYield {
  month: string;
  yield: number;
}

export interface CropYieldResponse {
  success: boolean;
  data: CropYield[];
}