import React, { useState, useRef, useEffect } from 'react';
import { Modal, Radio, Form, Button, Row, Col, Input, Checkbox } from 'antd';
import styles from '../css/LoginForm.module.css';
import {
  getCaptcha,
  getUserById,
  login,
  register,
  userHasExist,
} from '../api/user';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { changeLoginState, initUserInfo } from '../redux/userSlice';

const LoginForm = (props) => {
  useEffect(() => {
    captchaClickHandler();
  }, [props.isShow]);

  // 将输入框对应的状态更新抽离为一个通用函数
  const updateInfo = (info, value, key, setInfo) => {
    setInfo({ ...info, [key]: value });
  };

  const [value, setValue] = useState('login');
  const [captcha, setCaptcha] = useState('');
  const loginFormRef = useRef(null);
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: false,
  });
  const registerFormRef = useRef(null);
  const [registerInfo, setRegisterInfo] = useState({
    loginId: '',
    nickname: '',
    captcha: '',
  });

  const dispatch = useDispatch();

  const checkLoginIdExists = async () => {
    if (registerInfo.loginId) {
      const res = await userHasExist(registerInfo.loginId);
      return res.data ? Promise.reject('用户已存在') : Promise.resolve();
    }
  };

  const captchaClickHandler = async () => {
    const res = await getCaptcha();
    setCaptcha(res);
  };

  function cancelHandler() {
    setRegisterInfo({
      loginId: '',
      nickname: '',
      captcha: '',
    });
    setLoginInfo({
      loginId: '',
      loginPwd: '',
      captcha: '',
      remember: false,
    });
    props.closeModal();
  }

  const registerHandler = async () => {
    const res = await register(registerInfo);
    if (res.data) {
      message.success('用户注册成功，默认密码为123456，请尽快修改密码');
      dispatch(initUserInfo(res.data));
      dispatch(changeLoginState(true));
      cancelHandler();
    } else {
      message.warning(res.msg);
      captchaClickHandler();
    }
  };
  const loginHandler = async () => {
    const res = await login(loginInfo);
    if (res.data) {
      if (!res.data.data) {
        message.error('账号或密码不正确');
      } else if (res.data.enabled === false) {
        message.error('账号已被禁用');
      } else {
        message.success('登录成功');
        localStorage.setItem('userToken', res.data.token);
        const userInfo = await getUserById(res.data.data._id);
        dispatch(initUserInfo(userInfo.data));
        dispatch(changeLoginState(true));
        cancelHandler();
      }
    } else {
      message.warning(res.msg);
    }
    captchaClickHandler();
  };

  const resetHandler = () => {
    setRegisterInfo({
      loginId: '',
      nickname: '',
      captcha: '',
    });
    setLoginInfo({
      loginId: '',
      loginPwd: '',
      captcha: '',
      remember: false,
    });
  };
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
            message: '请输入账号',
          },
        ]}
      >
        <Input
          placeholder="请输入账号"
          value={loginInfo.loginId}
          onChange={(e) =>
            updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)
          }
        />
      </Form.Item>
      <Form.Item
        label="登录密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password
          placeholder="请输入你的登录密码，新用户默认为123456"
          autoComplete="off"
          value={loginInfo.loginPwd}
          onChange={(e) =>
            updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)
          }
        />
      </Form.Item>
      <Form.Item
        name="loginCaptcha"
        label="验证码"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
      >
        <Row align="middle">
          <Col span={16}>
            <Input
              placeholder="请输入验证码"
              value={loginInfo.captcha}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)
              }
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
          onChange={(e) =>
            updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)
          }
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
          htmlType="reset"
          onClick={() => resetHandler()}
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
        label="注册账号"
        name="loginId"
        rules={[
          {
            required: true,
            message: '请输入账号，仅此项为必填项',
          },
          // 验证用户是否已经存在
          { validator: checkLoginIdExists },
        ]}
        validateTrigger="onBlur"
      >
        <Input
          placeholder="请输入账号"
          value={registerInfo.loginId}
          onChange={(e) =>
            updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)
          }
        />
      </Form.Item>

      <Form.Item
        label="用户昵称"
        name="nickname"
      >
        <Input
          placeholder="请输入昵称，不填写默认为新用户xxx"
          value={registerInfo.nickname}
          onChange={(e) =>
            updateInfo(
              registerInfo,
              e.target.value,
              'nickname',
              setRegisterInfo,
            )
          }
        />
      </Form.Item>

      <Form.Item
        name="registerCaptcha"
        label="验证码"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
      >
        <Row align="middle">
          <Col span={16}>
            <Input
              placeholder="请输入验证码"
              value={registerInfo.captcha}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  'captcha',
                  setRegisterInfo,
                )
              }
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
          htmlType="reset"
          onClick={() => resetHandler()}
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
          onChange={(e) => {
            setValue(e.target.value);
            captchaClickHandler();
          }}
          className={styles.radioGroup}
          buttonStyle="solid"
          style={{
            marginBottom: '20px',
          }}
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
        <div className="container">
          {value === 'login' ? loginContainer : registerContainer}
        </div>
      </Modal>
    </>
  );
};
export default LoginForm;
