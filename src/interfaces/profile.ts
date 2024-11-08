export interface IProfile {
  profile: {
    id: string;
    slug: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: string;
    profileImageUri: string;
    coverImageUri: string;
    userType: string;
    status: string;
    categories: string[];
    country: string;
    state: string;
    city: string;
    about: string;
    emailVerifiedAt: string;
    businessOwner: IBusinessOwner;
    creator: ICreator;
    userReviews: IUserReviews;
    rejectionReason: string;
    verificationStatus: string;
  };
}

export interface IBusinessOwner {
  postedJobs: number;
}

export interface ICreator {
  creatorStar: number;
  completedJobs: string;
  youtubeDetails: any;
  instagramDetails: any;
}

export interface IUserReviews {
  avg: string;
  total: string;
}

export interface ProfileDetailProps {
  influencerData?: IProfile | null;
  businessOwner: IProfile | null;
}

export interface FormValues {
  name: string;
  number: string;
  gender: string;
  dob: string;
  category: string[];
  country: string;
  state: string;
  city: string;
  about: string;
}

export interface Review {
  user: {
    profileImageUri?: string;
    name: string;
  };
  review: string;
  description: string;
  createdAt: string;
}

export interface Profile {
  userType: string;
  id: string;
  userReviews?: IUserReviews;
}

export interface Filters {
  page: number;
  perPage: number;
  orderBy: string;
  userType?: string;
  userId?: string;
}
