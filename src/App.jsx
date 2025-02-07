import React from "react";
import Navigator from "./components/Navigator";
import CopyrightFooter from "./components/CopyrightFooter";
import { Layout } from "antd";

import "./css/App.css";
import RouterConfig from "./router/index.jsx";

const { Header, Footer, Content } = Layout;

const App = () => (
	<div className="App">
		<Layout>
			<Header className="header">
				<Navigator />
			</Header>
			<Content className="content">
				<RouterConfig />
			</Content>
			<Footer className="footer">
				<CopyrightFooter />
			</Footer>
		</Layout>
	</div>
);

export default App;