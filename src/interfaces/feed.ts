export interface IFeed {
  creatorFeed: IFeeds;
}

export interface IFeeds {
  items: IFeedItem[];
  pagination: IPagination;
}

export interface IFeedItem {
  user: IUser;
  id: string;
  slug: string;
  title: string;
  description: string;
  categories: string[];
  location: string[];
  maxPrice: string;
  minPrice: string;
  status: string;
  assignedUser: any;
  userProposals: IUserProposals[];
  proposalCount: string;
  createdAt: string;
  threadDetails: IthreadDetails;
  allowedProposals: boolean;
}

export interface IthreadDetails {
  threadId: string;
  threadStatus: string;
}

export interface IUser {
  id: string;
  slug: string;
  name: string;
  profileImageUri: string;
  status: string;
}

export interface IAssignedUser {
  id: string;
  name: string;
  profileImageUri: string | null;
}

export interface IUserProposals {
  id: string;
  name: string;
  profileImageUri: string | null;
}

export interface IPagination {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}
