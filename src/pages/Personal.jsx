import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import styles from '../css/Personal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Image, Modal, Upload, Input, Button, message } from 'antd';
import PersonalInfoItem from '../components/PersonalInfoItem';
import { formatDate } from '../utils/tools';
import { PlusOutlined } from '@ant-design/icons';
import { updateUserInfoAsync } from '../redux/userSlice';
import { passwordCheck } from '../api/user';

export default function Personal() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [panelName, setPanelName] = useState('');
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  function avatarUpdateHandler(url, type) {
    // 更新仓库 + 更新服务器
    dispatch(
      updateUserInfoAsync({ userId: userInfo._id, newInfo: { [type]: url } }),
    );
    message.success('修改成功');
  }

  function handleCancel() {
    setIsModalOpen(false);
  }
  function showModalOpen(name) {
    setEditInfo({});
    setIsModalOpen(true);
    setPanelName(name);
  }

  function handleOK() {
    const payload = {
      userId: userInfo._id,
      newInfo: editInfo,
    };
    console.log('🚀 ~ Personal.jsx:45 ~ handleOK ~ payload:', payload);

    dispatch(updateUserInfoAsync(payload));
    setIsModalOpen(false);
    message.success('修改成功');
  }

  const [editInfo, setEditInfo] = useState({});
  function updateInfo(value, type) {
    const newEditInfo = { ...editInfo };
    newEditInfo[type] = value.trim();
    setEditInfo(newEditInfo);
  }

  async function checkPassword() {
    if (passwordInfo.oldPassword) {
      const { data } = await passwordCheck(
        userInfo._id,
        passwordInfo.oldPassword,
      );
      return data ? Promise.resolve() : Promise.reject(new Error('密码错误'));
    }
  }

  function updatePasswordInfo(value, type) {
    const newPasswordInfo = { ...passwordInfo };
    newPasswordInfo[type] = value.trim();
    setPasswordInfo(newPasswordInfo);
    if (type === 'newPassword') {
      updateInfo(value, 'loginPwd');
    }
  }

  let modalContent = null;
  switch (panelName) {
    case '基本信息': {
      modalContent = (
        <>
          <Form
            name="basic1"
            autoComplete="off"
            initialValues={userInfo}
            onFinish={handleOK}
          >
            <Form.Item
              label="登陆密码"
              name="password"
              rules={[{ validator: checkPassword }]}
              validateTrigger="onBlur"
            >
              <Input.Password
                rows={6}
                value={passwordInfo.oldPassword}
                placeholder="请输入原密码"
                onChange={(e) =>
                  updatePasswordInfo(e.target.value, 'oldPassword')
                }
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
            >
              <Input.Password
                rows={6}
                value={passwordInfo.newPassword}
                placeholder="请输入新密码"
                onChange={(e) =>
                  updatePasswordInfo(e.target.value, 'newPassword')
                }
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                rows={6}
                value={passwordInfo.confirmPassword}
                placeholder="请再次输入新密码"
                onChange={(e) =>
                  updatePasswordInfo(e.target.value, 'confirmPassword')
                }
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="用户昵称"
              name="nickname"
            >
              <Input
                placeholder="昵称可选，默认为新用户"
                value={userInfo.nickname}
                onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                autoComplete="off"
              />
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
              >
                确认
              </Button>
              <Button
                type="link"
                htmlType="reset"
                className="resetBtn"
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </>
      );
      break;
    }
    case '社交帐号': {
      modalContent = (
        <>
          <Form
            name="basic2"
            autoComplete="off"
            initialValues={userInfo}
            onFinish={handleOK}
          >
            <Form.Item
              label="邮箱"
              name="mail"
            >
              <Input
                value={userInfo.mail}
                placeholder="请填写邮箱"
                onChange={(e) => updateInfo(e.target.value, 'mail')}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="QQ"
              name="qq"
            >
              <Input
                value={userInfo.qq}
                placeholder="请填写QQ"
                onChange={(e) => updateInfo(e.target.value, 'qq')}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="微信"
              name="wechat"
            >
              <Input
                value={userInfo.wechat}
                placeholder="请填写微信"
                onChange={(e) => updateInfo(e.target.value, 'wechat')}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="Github"
              name="github"
            >
              <Input
                value={userInfo.github}
                placeholder="请填写Github"
                onChange={(e) => updateInfo(e.target.value, 'github')}
                autoComplete="off"
              />
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
              >
                确认
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
        </>
      );
      break;
    }
    case '个人简介': {
      modalContent = (
        <>
          <Form
            name="basic2"
            autoComplete="off"
            initialValues={userInfo}
            onFinish={handleOK}
          >
            <Form.Item
              label="自我介绍"
              name="intro"
            >
              <Input.TextArea
                rows={6}
                value={userInfo.intro}
                placeholder="选填"
                onChange={(e) => updateInfo(e.target.value, 'intro')}
                autoComplete="off"
              />
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
              >
                确认
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
        </>
      );
      break;
    }
  }

  return (
    <div>
      <PageHeader title="个人中心" />
      <div className={styles.container}>
        <div className={styles.row}>
          <Card
            title="基本信息"
            extra={
              <div
                className={styles.edit}
                onClick={() => showModalOpen('基本信息')}
              >
                编辑
              </div>
            }
          >
            <PersonalInfoItem
              info={{
                itemName: '登陆账号',
                itemValue: userInfo.loginId,
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: '账号密码',
                itemValue: '********',
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: '用户昵称',
                itemValue: userInfo.nickname,
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: '用户积分',
                itemValue: userInfo.points,
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: '注册时间',
                itemValue: formatDate(userInfo.registerDate),
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: '上次登录时间',
                itemValue: formatDate(userInfo.lastLoginDate),
              }}
            />
            <div style={{ fontWeight: '100', height: '50px' }}>当前头像：</div>
            <Image
              src={userInfo.avatar}
              width={100}
            />
            <div style={{ fontWeight: '100', height: '50px' }}>
              上传新头像：
            </div>
            <Upload
              action="/api/upload"
              listType="picture-card"
              maxCount={1}
              onChange={(e) => {
                if (e.file.status === 'done') {
                  const url = e.file.response.data;
                  avatarUpdateHandler(url, 'avatar');
                }
              }}
            >
              <PlusOutlined />
            </Upload>
          </Card>
        </div>
        <div className={styles.row}>
          <Card
            title="社交帐号"
            extra={
              <div
                className={styles.edit}
                onClick={() => showModalOpen('社交帐号')}
              >
                编辑
              </div>
            }
          >
            <PersonalInfoItem
              info={{
                itemName: '邮箱',
                itemValue: userInfo.mail || '未填写',
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: '微信',
                itemValue: userInfo.wechat || '未填写',
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: 'QQ',
                itemValue: userInfo.qq || '未填写',
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: 'Github',
                itemValue: userInfo.github || '未填写',
              }}
            />
          </Card>
        </div>
        <div className={styles.row}>
          <Card
            title="个人简介"
            extra={
              <div
                className={styles.edit}
                onClick={() => showModalOpen('个人简介')}
              >
                编辑
              </div>
            }
          >
            <p className={styles.intro}>{userInfo.intro || '未填写'}</p>
          </Card>
        </div>
      </div>

      <Modal
        title={panelName}
        open={isModalOpen}
        onOK={handleOK}
        onCancel={handleCancel}
        footer={false}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
