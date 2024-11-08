import * as actionTypes from "../action-types";
import { IAction } from "../../interfaces/store";

const initialState: any = {
  creatorFeed: {},
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_CREATOR_FEED_DATA:
      return {
        ...state,
        creatorFeed: { ...state.creatorFeed, ...action.payload },
      };
    default:
      return state;
  }
};
export default reducer;
