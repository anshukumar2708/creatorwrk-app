import { IAuthState } from "./auth";
import { ICategory } from "./category";
import { IFeed } from "./feed";
import { IProfile } from "./profile";

export interface IAction {
  type: string;
  payload: any;
}

export interface State {
  auth: IAuthState;
  feed: IFeed;
  categories: ICategory;
  profile: IProfile;
}
