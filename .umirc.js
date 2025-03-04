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
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      icon: 'home',
      component: './Home',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'crown',
      routes: [
        {
          name: '管理员列表',
          path: 'adminList',
          component: './Admin',
        },
        {
          name: '添加管理员',
          path: 'addAdmin',
          component: './Admin/addAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'user',
      routes: [
        {
          name: '用户列表',
          path: 'userList',
          component: './User',
        },
        {
          name: '添加用户',
          path: 'addUser',
          component: './User/add',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'book',
      routes: [
        {
          name: '书籍列表',
          path: 'bookList',
          component: './Book',
        },
        {
          name: '添加书籍',
          path: 'addBook',
          component: './Book/add',
        },
      ],
    },
    {
      name: '问答',
      path: '/issue',
      icon: 'questionCircle',
      component: './Issue',
    },
    {
      name: '评论',
      path: '/comment',
      icon: 'message',
      component: './Comment',
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'edit',
      component: './Interview',
    },
    {
      name: '类型',
      path: '/type',
      icon: 'profile',
      component: './Type',
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
