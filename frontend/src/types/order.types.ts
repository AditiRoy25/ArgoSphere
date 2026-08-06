// ==========================================
// ORDER TYPES
// ==========================================

import type {
  ProductCategory,
} from "./marketplace.types";

// ==========================================
// PAYMENT STATUS
// ==========================================

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed";

// ==========================================
// ORDER STATUS
// ==========================================

export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// ==========================================
// PRODUCT INFO
// Returned after MongoDB populate()
// ==========================================

export interface OrderProductInfo {
  _id: string;

  name: string;

  category: ProductCategory;

  brand?: string;

  images: string[];
}

// ==========================================
// ORDER ITEM
// ==========================================

export interface OrderProduct {
  /*
   * Before populate:
   * product = MongoDB ObjectId string
   *
   * After populate:
   * product = OrderProductInfo
   */
  product:
    | string
    | OrderProductInfo;

  quantity: number;

  price: number;
}

// ==========================================
// CREATE ORDER ITEM
// ==========================================

export interface CreateOrderItem {
  product: string;

  quantity: number;

  /*
   * You don't need price here.
   *
   * Backend should read the actual
   * product price from MongoDB.
   */
}

// ==========================================
// CREATE ORDER PAYLOAD
// ==========================================

export interface CreateOrderPayload {
  products: CreateOrderItem[];
}

// ==========================================
// FARMER INFO
// Used for admin order list after populate()
// ==========================================

export interface OrderFarmer {
  _id: string;

  name: string;

  email: string;

  phone?: string;
}

// ==========================================
// ORDER
// ==========================================

export interface Order {
  _id: string;

  /*
   * Farmer dashboard:
   * farmer may be ObjectId string.
   *
   * Admin dashboard:
   * farmer may be populated.
   */
  farmer:
    | string
    | OrderFarmer;

  products: OrderProduct[];

  totalAmount: number;

  paymentStatus: PaymentStatus;

  orderStatus: OrderStatus;

  createdAt: string;

  updatedAt: string;
}

// ==========================================
// SINGLE ORDER RESPONSE
// ==========================================

export interface OrderResponse {
  success: boolean;

  message?: string;

  order: Order;
}

// ==========================================
// ORDERS LIST RESPONSE
// ==========================================

export interface OrdersResponse {
  success: boolean;

  message?: string;

  total?: number;

  orders: Order[];
}

// ==========================================
// UPDATE ORDER STATUS PAYLOAD
// ==========================================

export interface UpdateOrderStatusPayload {
  orderStatus: OrderStatus;
}

// ==========================================
// UPDATE PAYMENT STATUS PAYLOAD
// ==========================================

export interface UpdatePaymentStatusPayload {
  paymentStatus: PaymentStatus;
}