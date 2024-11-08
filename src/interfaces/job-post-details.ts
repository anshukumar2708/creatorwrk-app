export interface IJobPostDetails {
  id: string;
  slug: string;
  title: string;
  description: string;
  categories: string[];
  location: string[];
  maxPrice: string;
  minPrice: string;
  status: string;
  proposalCount: string;
  assignedUser: IAssignedUser[];
  createdAt: string;
  isReviewed: boolean;
  allowedProposals: string;
  reviews: {
    creatorReview: IReviewData | null;
    businessOwnerReview: IReviewData | null;
  };
}

export interface IAssignedUser {
  id: string;
  name: string;
  profileImageUri: any;
  threadId: string;
  slug: string;
}

export interface IProposalsListing {
  user: IUser;
  id: string;
  proposal: string;
  createdAt: string;
  threadDetails: IThreadDetails;
}

export interface IUser {
  id: string;
  slug: string;
  name: string;
  profileImageUri?: string;
}

export interface IThreadDetails {
  threadId: string;
  threadStatus: string;
}

export interface IReviewData {
  fromUserId: string;
  review: number;
  description: string;
}
