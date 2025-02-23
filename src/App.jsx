import React, { useEffect, useState } from "react";
import Navigator from "./components/Navigator";
import CopyrightFooter from "./components/CopyrightFooter";
import { Layout } from "antd";

import "./css/App.css";
import RouteBefore from "./router/RouteBefore.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { getInfo, getUserById } from "./api/user.js";
import { useDispatch } from "react-redux";
import { changeLoginState, initUserInfo } from "./redux/userSlice.js";
import { message } from "antd";

const { Header, Footer, Content } = Layout;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const loginHandler = () => {
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // 传递 token 获取 id 恢复登陆状态
      const res = await getInfo();
      if (res.data) {
        // token 有效
        const { data } = await getUserById(res.data._id);
        dispatch(initUserInfo(data));
        dispatch(changeLoginState(true));
      } else {
        // token 无效
        message.warning("登录状态失效，请重新登录");
        localStorage.removeItem("userToken");
      }
    }
    if (localStorage.getItem("userToken")) {
      fetchData();
    }
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <Navigator loginHandler={loginHandler} />
        </Header>
        <Content className="content">
          <RouteBefore />
        </Content>
        <Footer className="footer">
          <CopyrightFooter />
        </Footer>
        <LoginForm isShow={isModalOpen} closeModal={closeModal} />
      </Layout>
    </div>
  );
};

export default App;
