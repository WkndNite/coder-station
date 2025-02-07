import React, { useState, useRef, useEffect } from "react";
import { Modal, Radio, Form, Button, Row, Col, Input, Checkbox } from "antd";
import styles from "../css/LoginForm.module.css";
import { getCaptcha } from "../api/user";

const LoginForm = props => {
	useEffect(() => {
		captchaClickHandler();
	}, [props.isShow]);

	const [value, setValue] = useState("login");
	const loginFormRef = useRef(null);
	const [loginInfo, setLoginInfo] = useState({
		loginId: "",
		loginPwd: "",
		captcha: "",
		remember: false,
	});
	const registerFormRef = useRef(null);
	const [registerInfo, setRegisterInfo] = useState({
		loginId: "",
		nickname: "",
		captcha: "",
	});
	const [captcha, setCaptcha] = useState("");
	const loginHandler = () => {
		console.log(loginInfo);
	};

	const updateInfo = (info, value, key, setInfo) => {
		setInfo({ ...info, [key]: value });
	};
	const captchaClickHandler = async () => {
		const res = await getCaptcha();
		console.log(res);
		setCaptcha(res);
	};
	const registerHandler = () => {};

	const handleOk = () => {};

	const loginContainer = (
		<Form
			name="loginForm"
			autoComplete="off"
			onFinish={loginHandler}
			ref={loginFormRef}
		>
			<Form.Item
				label="登陆账号"
				name="loginId"
				rules={[
					{
						required: true,
						message: "请输入账号",
					},
				]}
			>
				<Input
					placeholder="请输入账号"
					value={loginInfo.loginId}
					onChange={e => updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)}
				/>
			</Form.Item>
			<Form.Item
				label="登录密码"
				name="password"
				rules={[
					{
						required: true,
						message: "请输入密码",
					},
				]}
			>
				<Input.Password
					placeholder="请输入你的登录密码，新用户默认为123456"
					value={loginInfo.loginPwd}
					onChange={e => updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)}
				/>
			</Form.Item>
			<Form.Item
				name="loginCaptcha"
				label="验证码"
				rules={[
					{
						required: true,
						message: "请输入验证码",
					},
				]}
			>
				<Row align="middle">
					<Col span={16}>
						<Input
							placeholder="请输入验证码"
							value={loginInfo.captcha}
							onChange={e => updateInfo(loginInfo, e.target.value, "captcha", setLoginInfo)}
						/>
					</Col>
					<Col span={6}>
						<div
							className={styles.captchaImg}
							onClick={captchaClickHandler}
							dangerouslySetInnerHTML={{ __html: captcha }}
						></div>
					</Col>
				</Row>
			</Form.Item>

			<Form.Item
				name="remember"
				wrapperCol={{
					offset: 5,
					span: 16,
				}}
			>
				<Checkbox
					onChange={e => updateInfo(loginInfo, e.target.checked, "remember", setLoginInfo)}
					checked={loginInfo.remember}
				>
					记住我
				</Checkbox>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 5,
					span: 16,
				}}
			>
				<Button
					type="primary"
					htmlType="submit"
					style={{ marginRight: 20 }}
				>
					登录
				</Button>
				<Button
					type="primary"
					htmlType="submit"
				>
					重置
				</Button>
			</Form.Item>
		</Form>
	);
	const registerContainer = (
		<Form
			name="basic2"
			autoComplete="off"
			ref={registerFormRef}
			onFinish={registerHandler}
		>
			<Form.Item
				label="登录账号"
				name="loginId"
				rules={[
					{
						required: true,
						message: "请输入账号，仅此项为必填项",
					},
					// 验证用户是否已经存在
					// { validator: checkLoginIdIsExist },
				]}
				validateTrigger="onBlur"
			>
				<Input
					placeholder="请输入账号"
					value={registerInfo.loginId}
					onChange={e => updateInfo(registerInfo, e.target.value, "loginId", setRegisterInfo)}
				/>
			</Form.Item>

			<Form.Item
				label="用户昵称"
				name="nickname"
			>
				<Input
					placeholder="请输入昵称，不填写默认为新用户xxx"
					value={registerInfo.nickname}
					onChange={e => updateInfo(registerInfo, e.target.value, "nickname", setRegisterInfo)}
				/>
			</Form.Item>

			<Form.Item
				name="registerCaptcha"
				label="验证码"
				rules={[
					{
						required: true,
						message: "请输入验证码",
					},
				]}
			>
				<Row align="middle">
					<Col span={16}>
						<Input
							placeholder="请输入验证码"
							value={registerInfo.captcha}
							onChange={e => updateInfo(registerInfo, e.target.value, "captcha", setRegisterInfo)}
						/>
					</Col>
					<Col span={6}>
						<div
							className={styles.captchaImg}
							onClick={captchaClickHandler}
							dangerouslySetInnerHTML={{ __html: captcha }}
						></div>
					</Col>
				</Row>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 5,
					span: 16,
				}}
			>
				<Button
					type="primary"
					htmlType="submit"
					style={{ marginRight: 20 }}
				>
					注册
				</Button>
				<Button
					type="primary"
					htmlType="submit"
				>
					重置
				</Button>
			</Form.Item>
		</Form>
	);

	return (
		<>
			<Modal
				title="注册/登录"
				open={props.isShow}
				onOk={handleOk}
				onCancel={props.closeModal}
			>
				<Radio.Group
					value={value}
					onChange={e => {setValue(e.target.value);captchaClickHandler()}}
					className={styles.radioGroup}
					buttonStyle="solid"
				>
					<Radio.Button
						className={styles.radioButton}
						value="login"
					>
						登录
					</Radio.Button>
					<Radio.Button
						className={styles.radioButton}
						value="register"
					>
						注册
					</Radio.Button>
				</Radio.Group>
				<div className="container">{value === "login" ? loginContainer : registerContainer}</div>
			</Modal>
		</>
	);
};
export default LoginForm;
