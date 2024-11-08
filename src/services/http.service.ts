// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseObj } from "../interfaces/services";
import { getUrl } from "../utils/api";
import AuthService from "./auth.service";

const axiosInstance = axios.create();
const CancelToken = axios.CancelToken;
const cancel_req: any = {};

export { cancel_req };

export const cancelRequest = (url: string) => {
  const f = cancel_req[url];
  if (f) {
    f();
  }
};

export interface AxiosParams {
  method: string;
  url: string;
  data?: any;
  contentType?: string;
  isLogin?: boolean;
  authToken?: string;
  isExpired?: boolean;
  noCache?: boolean;
}

export interface MiscellaneousRequestParams {
  contentType?: string;
  noCache?: boolean;
}

/**
 * get method
 * @param request object containing axios params
 */
const get = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {},
  isExpired = false
) => {
  return commonAxios({
    method: "GET",
    url: getUrl(url, params),
    isExpired: isExpired,
    ...otherData,
  });
};

/**
 * post method
 * @param request object containing axios params
 */
const post = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "POST",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * put method
 * @param request object containing axios params
 */
const put = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "PUT",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "DELETE",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * patch method
 * @param request object containing axios params
 */
const patch = (
  url: string,
  params: any = {},
  otherData: MiscellaneousRequestParams = {}
) => {
  return commonAxios({
    method: "PATCH",
    url: getUrl(url),
    data: params,
    ...otherData,
  });
};

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type, isLogin
 */
const commonAxios = ({
  method,
  url,
  data,
  contentType = "application/json",
  noCache = false,
}: AxiosParams): Promise<any> => {
  const headers: any = {
    "Content-Type": contentType,
  };

  const token = AuthService.getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`; //change this access token based on your requirement
  }

  if (noCache) {
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate, max-age=0";
  } // Please changes caching mechanism based on your requirements. Default setting to no cache

  let body: any = null;

  if (contentType === "application/json") {
    body = JSON.stringify(data);
  } else {
    body = data;
  }

  return new Promise((resolve, reject) => {
    axiosInstance({
      method: method,
      url: url,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel_req[url.split("?")[0].split(".com/")[1]] = c;
      }),
      headers: headers,
      data: body,
    } as AxiosRequestConfig)
      .then((response: AxiosResponse<ResponseObj<any>>) => {
        if (response && response.data) {
          //response structure might be not same for every project. Please check and update resolve method accordingly
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { axiosInstance };

const HttpService = {
  get: get,
  post: post,
  put: put,
  deleteRequest: deleteRequest,
  patch: patch,
};

export default HttpService;
