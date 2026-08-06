// ==========================================
// WEATHER ALERT
// ==========================================

export type WeatherAlertType =
  | "rain"
  | "storm"
  | "heatwave"
  | "coldwave"
  | "flood";

export type WeatherSeverity =
  | "low"
  | "medium"
  | "high";

export interface WeatherAlert {
  _id: string;

  district: string;

  alertType: WeatherAlertType;

  severity: WeatherSeverity;

  message: string;

  startTime: string;

  endTime: string;

  createdAt: string;

  updatedAt: string;
}

// ==========================================
// ALL ALERT RESPONSE
// ==========================================

export interface WeatherAlertsResponse {
  success: boolean;

  total: number;

  data: WeatherAlert[];
}

// ==========================================
// SINGLE ALERT RESPONSE
// ==========================================

export interface WeatherAlertResponse {
  success: boolean;

  data: WeatherAlert;
}