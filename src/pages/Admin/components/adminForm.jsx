import AdminController from '@/services/admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';
import { useRef } from 'react';

function AdminForm({ type, adminInfo, setAdminInfo, submitHandle }) {
  console.log('🚀 ~ AdminForm ~ type:', type);
  const formRef = useRef();

  function updateInfo(newContent, key) {
    const newAdminInfo = { ...adminInfo };
    newAdminInfo[key] = newContent;
    setAdminInfo(newAdminInfo);
  }

  async function checkLoginId() {
    if (adminInfo.loginId && type === 'add') {
      const { data } = await AdminController.adminIsExist(adminInfo.loginId);
      if (data) {
        // 说明该 loginId 已经注册过了
        return Promise.reject('该管理员已经注册过了');
      }
    }
  }

  console.log('🚀 ~ AdminForm ~ adminInfo:', adminInfo);

  if (formRef.current) {
    formRef.current.setFieldsValue(adminInfo);
  }

  let avatarPreview = null;
  if (type === 'edit') {
    avatarPreview = (
      <Form.Item
        label="当前头像"
        name="avatarPreview"
      >
        <Image
          src={adminInfo?.avatar}
          width={100}
        />
      </Form.Item>
    );
  }
  return (
    <Form
      name="basic"
      initialValues={adminInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={submitHandle}
    >
      {/* 账号 密码 昵称 权限 头像  */}
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入管理员账号' },
          { validateTrigger: 'onBlur', validator: checkLoginId },
        ]}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          autoComplete="off"
          disabled={type === 'edit'}
        />
      </Form.Item>

      <Form.Item
        label="密码"
        name="loginPwd"
        rules={[
          type === 'edit' ? { required: true, message: '请输入密码' } : null,
        ]}
      >
        <Input.Password
          placeholder={type === 'add' ? '密码可选，默认是123123' : '密码可选'}
          autoComplete="off"
          value={adminInfo?.loginPwd}
          onChange={(e) => {
            updateInfo(e.target.value, 'loginPwd');
          }}
        />
      </Form.Item>

      <Form.Item
        label="管理员昵称"
        name="nickname"
        rules={[
          type === 'edit'
            ? { required: true, message: '请输入管理员昵称' }
            : null,
        ]}
      >
        <Input
          value={adminInfo?.nickname}
          placeholder="昵称可选，默认为新增管理员"
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        />
      </Form.Item>

      <Form.Item
        label="权限选择"
        name="permission"
        rules={[{ required: true, message: '请选择权限' }]}
      >
        <Radio.Group
          onChange={(e) => updateInfo(e.target.value, 'permission')}
          value={adminInfo?.permission}
        >
          <Radio value={2}>普通管理员</Radio>
          <Radio value={1}>超级管理员</Radio>
        </Radio.Group>
      </Form.Item>

      {avatarPreview}

      <Form.Item
        label="上传头像"
        name="avatar"
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          action="/api/upload"
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成，我们需要拿到该图片在服务器的路径
              const url = e.file.response.data;
              updateInfo(url, 'avatar');
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: '8px' }}>头像可选</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          {type === 'add' ? '确认新增' : '确认修改'}
        </Button>
        <Button
          type="link"
          htmlType="submit"
          className="resetBtn"
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminForm;
