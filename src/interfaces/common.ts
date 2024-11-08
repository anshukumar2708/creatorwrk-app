export interface IBottomBar {
  key: number;
  title: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  alt: string;
  path: string;
}
export interface IPagination {
  hasNextPage: boolean;
  totalPages: number;
  totalItems: number;
  page: number;
}

export interface IFilters {
  page: number;
  perPage: number;
  orderBy: "DESC" | "ASC";
  searchQuery?: string;
}
