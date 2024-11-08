import * as actionTypes from "../action-types";
import { IAction } from "../../interfaces/store";

const initialState: any = {
  category: [],
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_DATA:
      return {
        ...state,
        categories: [...state.category, ...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
