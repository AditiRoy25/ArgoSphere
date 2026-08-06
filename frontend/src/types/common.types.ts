export interface SelectOption {
  label: string;
  value: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface SearchQuery {
  search?: string;
}

export interface DateRange {
  from?: string;
  to?: string;
}

export interface FileUpload {
  image?: File | null;
}

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "blocked";