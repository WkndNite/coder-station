import UserController from '@/services/user';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import UserForm from './components/userForm';

function EditUser(props) {
  const { id } = useParams();
  console.log('🚀 ~ EditUser ~ id:', id);

  useEffect(() => {
    async function getUserInfoById() {
      const { data } = await UserController.getUserById(id);
      setUserInfo(data);
    }
    getUserInfoById();
  }, [id]);

  const [userInfo, setUserInfo] = useState({
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
    console.log('🚀 ~ submitHandle ~ userInfo:', userInfo);
    UserController.editUser(userInfo._id, userInfo);
    message.success('修改用户成功');
    navigate('/user/userList');
  }
  return (
    <PageContainer>
      <div
        className="container"
        style={{ width: '800px' }}
      >
        <UserForm
          type="edit"
          userInfo={userInfo}
          setNewUserInfo={setUserInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
}

export default EditUser;
