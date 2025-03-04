import UserController from '@/services/user';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import UserForm from './components/userForm';

function AddUser(props) {
  const [newUserInfo, setNewUserInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    mail: '',
    qq: '',
    wechat: '',
    intro: '',
  });
  const navigate = useNavigate();

  function submitHandle() {
    UserController.addUser(newUserInfo);
    navigate('/user/userList');
    message.success('添加用户成功');
  }

  return (
    <PageContainer>
      <div
        className="container"
        style={{ width: '800px' }}
      >
        <UserForm
          type="add"
          userInfo={newUserInfo}
          setNewUserInfo={setNewUserInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
}

export default AddUser;
