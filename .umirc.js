import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'coderstation',
  },
  dva: {},
  routes: [
    {
      path: '/login',
      component: './Login',
      menuRender: false,
    },
    {
      path: '/',
      redirect: '/home',
      access: 'NormalAdmin',
    },
    {
      name: '首页',
      path: '/home',
      icon: 'home',
      component: './Home',
      access: 'NormalAdmin',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'crown',
      access: 'SuperAdmin',

      routes: [
        {
          name: '管理员列表',
          path: 'adminList',
          component: './Admin',
          access: 'SuperAdmin',
        },
        {
          name: '添加管理员',
          path: 'addAdmin',
          component: './Admin/addAdmin',
          access: 'SuperAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'user',
      access: 'NormalAdmin',

      routes: [
        {
          name: '用户列表',
          path: 'userList',
          component: './User',
          access: 'NormalAdmin',
        },
        {
          name: '添加用户',
          path: 'addUser',
          component: './User/addUser',
          access: 'NormalAdmin',
        },
        {
          name: '修改用户',
          path: 'editUser/:id',
          component: './User/editUser',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'book',
      access: 'NormalAdmin',

      routes: [
        {
          name: '书籍列表',
          path: 'bookList',
          component: './Book',
          access: 'NormalAdmin',
        },
        {
          name: '添加书籍',
          path: 'addBook',
          component: './Book/addBook',
          access: 'NormalAdmin',
        },
        {
          name: '修改书籍',
          path: 'editBook/:id',
          component: './Book/editBook',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '问答',
      path: '/issue',
      icon: 'questionCircle',
      component: './Issue',
      access: 'NormalAdmin',
    },
    {
      name: '评论',
      path: '/comment',
      icon: 'message',
      component: './Comment',
      access: 'NormalAdmin',
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'edit',
      component: './Interview',
      access: 'NormalAdmin',
    },
    {
      name: '类型',
      path: '/type',
      icon: 'profile',
      component: './Type',
      access: 'NormalAdmin',
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
    '/res': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
  },
  npmClient: 'pnpm',
});
