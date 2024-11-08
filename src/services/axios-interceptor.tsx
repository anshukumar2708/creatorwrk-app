import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./http.service";
import { createAction, logOut, showNotification } from "../utils/common";
import * as actionTypes from "../store-items/action-types";
import { ErrorMessage } from "../assets/locales/constant";
import { useNotificationToaster } from "../hooks/use-notification-toaster";

let resInterceptor: number;

const WithErrorHandler: FC = () => {
  const dispatch = useDispatch();
  const notify = useNotificationToaster();
  /**
   * add response interceptor before component gets mounted
   * check if response data contains status="FAILURE", if yes, show an error message
   * if response gives a non-200 error code, sh`ow error from error data
   * if response contains a message to show, show success notification
   */

  useEffect(() => {
    resInterceptor = axiosInstance.interceptors.response.use(
      (res) => {
        const result = res.data;
        if (result && result.status && result.status === "FAILURE") {
          // showNotification(result.message, "error");
          // throw new Error(res.data.message);
        } else if (
          res.data &&
          res.data.status &&
          res.data.status === "SUCCESS"
        ) {
          if (res.data.message) {
            //Currently commenting success message. Because we do not want success message from every api
            // toast.success(res.data.message, "success");
          }
        }
        return res;
      },
      (error) => {
        // check if error is having data
        if (error.response && error.response.data && error.response.status) {
          // const status = error.response.status;
          const responseData = error.response.data;
          // is http error code is 401, log out of the application
          if (responseData?.code === 1010 || responseData?.code === 1003) {
            dispatch(createAction(actionTypes.LOGOUT));
            logOut();
          }
          if (responseData?.code === 1007) {
            showNotification(
              "Your session is expired. Please login again.",
              "error"
            );
            dispatch(createAction(actionTypes.LOGOUT));
            logOut();
          }
          if (
            responseData.message &&
            responseData.message === "Validation failed (uuid is expected)"
          ) {
            // message.error("Not Found");
            notify("error", "Not found");
          } else if (
            responseData.message &&
            !responseData.message?.includes("not found")
          ) {
            if (responseData?.code === 1004) {
              // showNotification(responseData?.message, "error");
              notify("error", responseData?.message);
            } else {
              responseData?.code !== 1020 &&
                responseData?.code !== 1007 &&
                responseData?.code !== 1016 &&
                responseData?.code !== 1002 && // for sync error
                // showNotification(ErrorMessage[responseData?.code], "error");
                notify("error", ErrorMessage[responseData?.code]);
            }
          } // do not show no data found, no nft found messages in toast notifications
          // throw error;
        }
        // throw error;
      }
    );

    return () => axiosInstance.interceptors.response.eject(resInterceptor);
  }, [dispatch, notify]);

  return <></>;
};

export default WithErrorHandler;
