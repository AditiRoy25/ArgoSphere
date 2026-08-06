export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: T[];
  pagination: PaginationMeta;
}

export interface SingleResponse<T> extends ApiResponse {
  data: T;
}

export interface ListResponse<T> extends ApiResponse {
  items: T[];
}

export interface CountResponse extends ApiResponse {
  total: number;
}

