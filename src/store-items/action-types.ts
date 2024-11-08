//all the dispatched action goes here
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const LOGOUT = "LOGOUT";

export const SET_WEB3AUTH = "SET_WEB3AUTH";
export const REMOVE_WEB3AUTH = "REMOVE_WEB3AUTH";

export const SET_PROVIDER = "SET_PROVIDER";

export const SET_WEB3AUTH_USER = "SET_WEB3AUTH_USER";

export const SET_USER_DATA = "SET_USER_DATA";

export const SET_ETH_BALANCE = "SET_ETH_BALANCE";

export const SET_FIGHT_TOKEN_BALANCE = "SET_FIGHT_TOKEN_BALANCE";

export const SET_REPS_BALANCE = "SET_REPS_BALANCE";

// Influencer
export const SET_CREATOR_FEED_DATA = "SET_CREATOR_FEED_DATA";

// Set Up Profile
export const GET_CATEGORY_DATA = "GET_CATEGORY_DATA ";

//profile me get
export const GET_PROFILE_DATA = "GET_PROFILE_DATA";

export function UPDATE_PROFILE(UPDATE_PROFILE: any, data: any): { type: string; payload: {}; } {
  throw new Error("Function not implemented.");
}
