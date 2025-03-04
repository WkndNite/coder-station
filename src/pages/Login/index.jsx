import AdminController from '@/services/admin';
import { BarcodeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import ReactCanvasNest from 'react-canvas-nest';
import styles from './index.module.css';

function Login() {
  function onFinish() {}
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: true,
  });

  function updateInfo(value, key) {
    setLoginInfo({ ...loginInfo, [key]: value });
  }

  async function onFinish() {
    const result = await AdminController.login(loginInfo);
    // code 406 代表验证码错误
    // data null 代表账号密码错误
    if (result.code === 406) {
      message.warning('验证码错误');
      captchaClickHandle();
    } else if (!result.data?.data) {
      message.warning('账号密码错误');
      captchaClickHandle();
    } else if (!result.data?.data.enabled) {
      message.warning('账号已被禁用');
      captchaClickHandle();
    } else {
      message.success('登录成功');
      localStorage.setItem('token', result.data.token);
      location.href = '/';
    }
    console.log('🚀 ~ onFinish ~ result:', result);
  }

  const [captcha, setCaptcha] = useState('');
  async function captchaClickHandle() {
    const res = await AdminController.getCaptcha();
    setCaptcha(res);
  }

  useEffect(() => {
    captchaClickHandle();
  }, []);

  return (
    <div>
      <ReactCanvasNest
        className="canvasNest"
        config={{ pointColor: ' 255, 0, 0 ', count: 66, follow: true }}
        style={{ zIndex: 1 }}
      />
      <div className={styles.container}>
        <h1>coder station 后台</h1>
        <Form
          name="normal_login"
          initialValues={loginInfo}
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
              value={loginInfo.loginId}
              onChange={(e) => updateInfo(e.target.value, 'loginId')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              value={loginInfo.loginPwd}
              onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
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
                  prefix={<BarcodeOutlined className="site-form-item-icon" />}
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, 'captcha')}
                />
              </Col>
              <Col span={8}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="remember"
            className={styles.remember}
          >
            <Checkbox
              checked={loginInfo.remember}
              onChange={(e) => updateInfo(e.target.checked, 'remember')}
            >
              7天免登录
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.loginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
