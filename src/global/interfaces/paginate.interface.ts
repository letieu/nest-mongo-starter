export interface PaginateResponse<T> {
  items: T[];
  paginate: PaginateMeta;
}

export interface PaginateMeta {
  count: number;
  page: number;
  size: number;
}
