import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import "./css/reset.css";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import "@ant-design/v5-patch-for-react-19";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
);
