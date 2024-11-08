export interface IFeedDetails {
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
  userProposals: any;
  proposalCount: string;
  createdAt: any;
  isProposalDeleted: boolean;
  threadDetails: IthreadDetails;
  allowedProposals: boolean;
}

export interface IthreadDetails {
  threadId: string;
  threadStatus: string;
}

export interface IProposalsListing {
  user: IUser;
  id: string;
  proposal: string;
  createdAt: string;
}

export interface IUser {
  id: string;
  slug: string;
  name: string;
  profileImageUri: string;
}

export interface IAssignedUser {
  id: string;
  name: string;
  profileImageUri: any;
}

export interface IUserProposal {
  id: string;
  name: string;
  profileImageUri?: string;
}
