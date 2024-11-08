export interface IAuthState {
  login: boolean;
  user: IUserDetails;
  ethBalance?: number | null;
  activeLanguage?: string;
}

export interface IUserDetails {
  isProfileCompleted?: boolean;
  swapToFightRatio?: number;
  slug: any;
  name: any;
  email: string;
  phoneNumber: any;
  dateOfBirth: any;
  gender: any;
  profileImageUri: any;
  coverImageUri: any;
  userType: string;
  status: string;
  categories: any;
  country: any;
  state: any;
  city: any;
  about: any;
  emailVerifiedAt: any;
  businessOwner: IBusinessOwner;
  creator: ICreator;
}
export interface IBusinessOwner {}

export interface ICreator {
  creatorStar: string;
  completedJobs: string;
}

export interface IOnBoardingForm {
  handleSubmit: (data: Record<string, any>, next_step: string) => void;
  values: Record<string, string>;
}

export interface IAuthUserDetails {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
}

export interface ISignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginValues {
  email: string;
  password: string;
}

// change password page
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ILogoutModal {
  logoutPopUp: boolean;
  setLogoutPopUp: (show: boolean) => void;
}
