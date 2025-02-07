import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

import "./css/reset.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<ConfigProvider locale={zhCN}>
			<App />
		</ConfigProvider>
	</BrowserRouter>
);
