import { useCallback } from "react";
import CongratulationIcon from "../assets/images/svg/congratulation";
import { useNotificationApi } from "../components/my-context/notification-api";
import ErrorToastIcon from "../assets/images/svg/error-toadt-icon";
import { useMediaQuery } from "@uidotdev/usehooks";

// Define allowed types for the notification
type NotificationType = "success" | "error" | "info" | "warning";

// Custom hook to create a notification toaster
export const useNotificationToaster = () => {
  const api = useNotificationApi();
  const isLargeDevice = useMediaQuery("only screen and (min-width : 640px)");

  const notify = useCallback(
    (type: NotificationType, description: string) => {
      api.open({
        message: null,
        description: (
          <div className="w-full flex justify-start items-center rounded-lg">
            <span className="mr-2">
              {type === "success" ? (
                <CongratulationIcon width={30} height={30} />
              ) : (
                <ErrorToastIcon width={30} height={30} />
              )}
            </span>
            <h3 className="text-lightWhite text-base font-medium leading-5 ml-2">
              {description}
            </h3>
          </div>
        ),
        className: `bg-darkBlack border-2 border-grey rounded-lg ${
          isLargeDevice ? "toasterLg" : "toasterSm"
        }`,
        closeIcon: true,
        // placement: window.innerWidth > 640 ? "top" : "bottom",
        placement: "top",
        duration: 2,
      });
    },
    [api, isLargeDevice]
  );

  return notify;
};
