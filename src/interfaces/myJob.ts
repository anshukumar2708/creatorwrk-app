export interface IMyJob {
  items: IMyJobData[];
  pagination: IMyJobPagination;
}
export interface IMyJobData {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  location: string[];
  maxPrice: number;
  minPrice: number;
  status: string;
  assignedUser: IAssignedProposalsUser[];
  id: string;
  proposalCount: string;
  userProposals: IAssignedProposalsUser[];
  createdAt: any;
  threadDetails: IThreadDetails;
  allowedProposals: boolean;
}

export interface IThreadDetails {
  threadId: string;
  threadStatus: string;
}
export interface IMyJobPagination {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IAssignedProposalsUser {
  id: string;
  name: string;
  threadId: string;
  profileImageUri: string;
}

export interface ImyJobFilter {
  page: number;
  perPage: number;
  orderBy: string;
  status: string;
  searchQuery: string;
}

export interface ICreateJobValues {
  jobTitle: string;
  category: string[];
  description: string;
  location: string;
  fixPrice?: string;
  minPrice?: string;
  maxPrice?: string;
  remember?: boolean;
}
