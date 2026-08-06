// src/types/marketplace.types.ts

// ==========================================
// PRODUCT STATUS
// ==========================================

export type ProductStatus =
  | "available"
  | "out_of_stock"
  | "inactive";

// ==========================================
// PRODUCT CATEGORY
// ==========================================

export type ProductCategory =
  | "tractor"
  | "harvester"
  | "pump"
  | "sprayer"
  | "tool"
  | "seed"
  | "fertilizer";

// ==========================================
// PRODUCT
// ==========================================

export interface Product {
  _id: string;

  name: string;

  category: ProductCategory;

  brand?: string;

  price: number;

  stock: number;

  specifications?: Record<
    string,
    string
  >;

  images: string[];

  description?: string;

  status: ProductStatus;

  totalSold?: number;

  createdAt: string;

  updatedAt: string;
}

// ==========================================
// PRODUCT RESPONSE
// ==========================================

export interface ProductResponse {
  success: boolean;

  message?: string;

  product: Product;
}

// ==========================================
// PRODUCTS RESPONSE
// ==========================================

export interface ProductsResponse {
  success: boolean;

  message?: string;

  total?: number;

  page?: number;

  totalPages?: number;

  products: Product[];
}

// ==========================================
// CREATE PRODUCT PAYLOAD
// ==========================================

export interface CreateProductPayload {
  name: string;

  description?: string;

  price: number;

  category: ProductCategory;

  brand?: string;

  stock: number;

  specifications?: Record<
    string,
    string
  >;

  image?: File | string;

  status?: ProductStatus;
}

// ==========================================
// UPDATE PRODUCT PAYLOAD
// ==========================================

export type UpdateProductPayload =
  Partial<CreateProductPayload>;

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
// POPULATED ORDER PRODUCT
// ==========================================

export interface OrderProductInfo {
  _id: string;

  name: string;

  category: ProductCategory;

  brand?: string;

  images: string[];
}

// ==========================================
// ORDER PRODUCT
// ==========================================

export interface OrderProduct {
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
}

// ==========================================
// CREATE ORDER PAYLOAD
// ==========================================

export interface CreateOrderPayload {
  products: CreateOrderItem[];
}

// ==========================================
// POPULATED FARMER
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
// ORDERS RESPONSE
// ==========================================

export interface OrdersResponse {
  success: boolean;

  message?: string;

  total?: number;

  orders: Order[];
}

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export interface UpdateOrderStatusPayload {
  orderStatus: OrderStatus;
}

// ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

export interface UpdatePaymentStatusPayload {
  paymentStatus: PaymentStatus;
}

// ==========================================
// CATEGORY REPORT
// ==========================================

export interface CategoryReport {
  _id: ProductCategory;

  totalProducts: number;
}

export interface CategoryReportResponse {
  success: boolean;

  report: CategoryReport[];
}

// ==========================================
// TOP SELLING PRODUCT
// ==========================================

export interface TopSellingProduct {
  _id: string;

  name: string;

  totalSold: number;
}

export interface TopSellingResponse {
  success: boolean;

  products: TopSellingProduct[];
}

// ==========================================
// REVENUE REPORT
// ==========================================

export interface RevenueReportResponse {
  success: boolean;

  totalRevenue: number;

  totalOrders: number;
}