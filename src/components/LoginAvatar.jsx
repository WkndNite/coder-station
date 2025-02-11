import React from "react";
import { useSelector } from "react-redux";
import { Button, List, Popover, Avatar, Image } from "antd";
import styles from "../css/LoginAvatar.module.css";
import { useDispatch } from "react-redux";
import { changeLoginState, clearUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router";

export default function LoginAvatar(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  const { avatar: url } = userInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item === "个人中心") {
      console.log("个人中心");
    } else if (item === "退出登录") {
      localStorage.removeItem("userToken");
      dispatch(clearUserInfo());
      dispatch(changeLoginState(false));
      navigate("/");
    }
  };

  const popOverContent = (
    <List
      dataSource={["个人中心", "退出登录"]}
      renderItem={(item) => (
        <List.Item
          style={{ cursor: "pointer" }}
          onClick={() => handleMenuClick(item)}
        >
          {item}
        </List.Item>
      )}
    />
  );

  const loginJSX = (
    <Popover content={popOverContent} trigger="hover">
      <div className={styles.avatarContainer}>
        <Avatar src={<Image src={userInfo?.avatar} preview={false} />} />
      </div>
    </Popover>
  );
  const unLoginJSX = (
    <Button type="primary" size="large" onClick={props.loginHandler}>
      注册/登录
    </Button>
  );

  return isLogin ? loginJSX : unLoginJSX;
}
