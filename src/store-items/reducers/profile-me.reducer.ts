import { IAction } from "../../interfaces/store";
import * as actionTypes from "../action-types";

const initialState: any = {
  profile: {},
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE_DATA:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
