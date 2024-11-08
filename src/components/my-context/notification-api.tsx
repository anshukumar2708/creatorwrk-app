import { createContext, useContext } from "react";
import { NotificationInstance } from "antd/es/notification/interface";

export const NotificationContext = createContext<
  NotificationInstance | undefined
>(undefined);

// Custom hook for accessing notification api
export const useNotificationApi = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationApi must be used within a NotificationProvider"
    );
  }
  return context;
};
