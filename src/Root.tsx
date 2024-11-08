import { ConfigProvider, notification } from "antd";
// import { StyleProvider } from "@ant-design/cssinjs";

import { FC } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import WithErrorHandler from "./services/axios-interceptor";
import i18n from "./services/translation"; // refer this file for all translations related services
import store from "./store";
import { NotificationContext } from "./components/my-context/notification-api";

const Root: FC = (props) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6174FF",
        },
        components: {
          // Select: {
          //   colorPrimary: "#5242B6",
          //   colorBgBase: "black",
          //   colorBorder: "back",
          //   colorText: "white",
          // },
        },
      }}
    >
      <I18nextProvider i18n={i18n}>
        {contextHolder}
        <NotificationContext.Provider value={api}>
          <Provider store={store}>
            <WithErrorHandler />
            <BrowserRouter>
              <App {...props} />
              <WithErrorHandler />
            </BrowserRouter>
          </Provider>
        </NotificationContext.Provider>
      </I18nextProvider>
    </ConfigProvider>
  );
};

export default Root;
