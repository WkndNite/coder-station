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
      hideInBreadcrumb: true,
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
      hideInBreadcrumb: true,
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
      hideInBreadcrumb: true,
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
      name: ' 问答详情',
      path: '/issue/:id',
      component: './Issue/issueDetail',
      access: 'NormalAdmin',
      hideInMenu: true,
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
      access: 'NormalAdmin',
      icon: 'EditOutlined',
      hideInBreadcrumb: true,
      routes: [
        {
          path: 'interviewList',
          name: '题目列表',
          access: 'NormalAdmin',
          component: './Interview',
        },
        {
          path: 'addInterview',
          name: '添加题目',
          access: 'NormalAdmin',
          component: './Interview/addInterview',
        },
        {
          path: 'interviewList/:id',
          name: '题目详情',
          access: 'NormalAdmin',
          component: './Interview/interviewDetail',
          hideInMenu: true,
        },
        {
          path: 'editInterview/:id',
          name: '编辑题目',
          access: 'NormalAdmin',
          component: './Interview/editInterview',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '类型',
      path: '/type',
      icon: 'profile',
      component: './Type',
      access: 'NormalAdmin',
    },
    {
      name: '404',
      component: './404',
      hideInMenu: true,
      path: '*',
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
