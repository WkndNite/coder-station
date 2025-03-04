// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import AdminController from '@/services/admin';
import { message } from 'antd';

export const request = {
  timeout: 3000,
  requestInterceptors: [
    function (url, options) {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
      }
      return { url, options };
    },
  ],
};

export async function getInitialState() {
  if (location.pathname === '/login') {
    const token = localStorage.getItem('token');
    if (token) {
      const result = await AdminController.getInfo();
      if (result.data) {
        message.warning('请勿重复登录', 1).then(() => {
          history.go(-1);
        });
      }
    }
  } else {
    const result = await AdminController.getInfo();
    if (result.data) {
      const { data } = await AdminController.getAdminById(result.data._id);
      return {
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      localStorage.removeItem('token');
      message.warning('请先登录', 1).then(() => {
        location.href = '/login';
      });
    }
  }
  return { avatar: null };
}

export const layout = () => {
  return {
    logo: 'https://cdn-icons-png.flaticon.com/128/1437/1437111.png',
    menu: {
      locale: false,
    },
    logout: () => {
      localStorage.removeItem('token');
      message.success('退出成功', 1).then(() => {
        location.href = '/login';
      });
    },
  };
};
