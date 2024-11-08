import { combineReducers } from "redux";

import auth from "./reducers/auth.reducer";
import feed from "./reducers/creator-feed.reducer";
import categories from "./reducers/category.reducer";
import profile from "./reducers/profile-me.reducer";

import { IAction, State } from "../interfaces/store";

const appReducer = combineReducers({
  auth: auth,
  feed: feed,
  categories: categories,
  profile: profile,
}); // update or remove from here to manage your reducers

const rootReducer = (state: State | undefined, action: IAction) => {
  if (action.type === "LOGOUT") {
    // AuthService.removeAuthData();  //please make sure to remove everything from local storage on log out
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
