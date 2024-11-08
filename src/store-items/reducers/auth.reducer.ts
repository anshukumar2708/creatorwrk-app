import * as actionTypes from "../action-types";
import { IAuthState, IUserDetails } from "../../interfaces/auth";
import { IAction } from "../../interfaces/store";
import AuthService from "../../services/auth.service";

const initialState: IAuthState = {
  login: !!localStorage.getItem("token"),
  user: {
    isProfileCompleted: true,
    swapToFightRatio: 5, // this ratio is coming from memberInfo api
  } as IUserDetails,
  ethBalance: null,
  activeLanguage: AuthService.getUserLng(),
};

const reducer = (
  state: IAuthState = initialState,
  action: IAction
): IAuthState => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        login: true,
        user: action.payload.user,
      };

    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        activeLanguage: action.payload,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        login: false,
        user: {} as IUserDetails,
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case actionTypes.SET_ETH_BALANCE:
      return {
        ...state,
        ethBalance: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
