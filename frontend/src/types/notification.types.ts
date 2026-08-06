export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "weather" | "scheme" | "marketplace" | "learning" | "general";
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
}