import React, { useState } from "react";
import Navigator from "./components/Navigator";
import CopyrightFooter from "./components/CopyrightFooter";
import { Layout } from "antd";

import "./css/App.css";
import RouterConfig from "./router/index.jsx";
import LoginForm from "./components/LoginForm.jsx";

const { Header, Footer, Content } = Layout;

const App = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const loginHandler = () => {
		setIsModalOpen(true);
	};
	return (
		<div className="App">
			<Layout>
				<Header className="header">
					<Navigator loginHandler={loginHandler} />
				</Header>
				<Content className="content">
					<RouterConfig />
				</Content>
				<Footer className="footer">
					<CopyrightFooter />
				</Footer>
				<LoginForm
					isShow={isModalOpen}
					closeModal={closeModal}
				/>
			</Layout>
		</div>
	);
};

export default App;
