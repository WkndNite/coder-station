import React from "react";
import { useSelector } from "react-redux";
import { Button, List, Popover, Avatar, Image } from "antd";
import styles from "../css/LoginAvatar.module.css";

export default function LoginAvatar(props) {
	const { isLogin, userInfo } = useSelector(state => state.user);
	const { avatar: url } = userInfo;

	const popOverContent = (
		<List
			dataSource={["个人中心", "退出登录"]}
			renderItem={item => <List.Item>{item}</List.Item>}
		/>
	);

	const loginJSX = (
		<Popover
			content={popOverContent}
			trigger="hover"
		>
		
			<div className={styles.avatarContainer}>
				<Avatar src={<Image src={userInfo?.avatar} preview={false} />} />
			</div>
		</Popover>
	);
	const unLoginJSX = (
		<Button
			type="primary"
			size="large"
			onClick={props.loginHandler}
		>
			注册/登录
		</Button>
	);

	return isLogin ? loginJSX : unLoginJSX;
}
