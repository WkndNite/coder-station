import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Upload } from 'antd';
import { useEffect, useRef } from 'react';

function UserForm({ type, userInfo, setNewUserInfo, submitHandle }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldsValue(userInfo);
    }
  }, [userInfo]);

  function updateInfo(value, key) {
    const newUserInfo = { ...userInfo };
    newUserInfo[key] = value;
    setNewUserInfo(newUserInfo);
  }

  let avatarPreview = null;
  if (type === 'edit') {
    avatarPreview = (
      <Form.Item
        label="当前头像"
        name="avatarPreview"
      >
        <Image
          src={userInfo?.avatar}
          width={100}
        />
      </Form.Item>
    );
  }

  return (
    <Form
      name="basic"
      initialValues={userInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={submitHandle}
    >
      <Form.Item
        label="登录账号"
        name="loginId"
        rules={[
          {
            required: true,
            message: '请输入登录账号',
          },
        ]}
      >
        <Input
          value={userInfo?.loginId}
          placeholder="账号为必填项"
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit'}
        />
      </Form.Item>
      <Form.Item
        label="登录密码"
        name="loginPwd"
      >
        <Input
          rows={6}
          value={userInfo?.loginPwd}
          placeholder="密码可选，默认为123456"
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        />
      </Form.Item>
      <Form.Item
        label="用户昵称"
        name="nickname"
        rules={[
          type === 'edit'
            ? { required: true, message: '用户昵称为必填项' }
            : null,
        ]}
      >
        <Input
          value={userInfo?.nickname}
          placeholder="昵称可选，默认为新用户"
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        />
      </Form.Item>
      {avatarPreview}
      <Form.Item
        label="用户头像"
        valuePropName="fileList"
      >
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            if (e.file.status === 'done') {
              updateInfo(e.file.response.data, 'avatar');
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>头像可选</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item
        label="用户邮箱"
        name="mail"
      >
        <Input
          value={userInfo?.mail}
          placeholder="邮箱可选"
          onChange={(e) => updateInfo(e.target.value, 'mail')}
        ></Input>
      </Form.Item>
      <Form.Item
        label="QQ号码"
        name="qq"
      >
        <Input
          value={userInfo?.qq}
          placeholder="QQ号码可选"
          onChange={(e) => updateInfo(e.target.value, 'qq')}
        ></Input>
      </Form.Item>
      <Form.Item
        label="微信号"
        name="wechat"
      >
        <Input
          value={userInfo?.wechat}
          placeholder="微信号可选"
          onChange={(e) => updateInfo(e.target.value, 'wechat')}
        ></Input>
      </Form.Item>
      <Form.Item
        label="个人简介"
        name="intro"
      >
        <Input.TextArea
          rows={6}
          value={userInfo?.intro}
          placeholder="个人简介可选"
          onChange={(e) => updateInfo(e.target.value, 'intro')}
        ></Input.TextArea>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          {type === 'edit' ? '更新用户' : '添加用户'}
        </Button>

        <Button
          type="link"
          htmlType="reset"
          style={{ marginLeft: '10px' }}
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
