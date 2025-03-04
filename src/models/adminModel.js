import AdminController from '@/services/admin';

export default {
  namespace: 'admin',
  state: {
    adminList: [], // 存储所有的管理员信息
  },
  // 同步更新仓库状态数据
  reducers: {
    initAdminList(state, { payload }) {
      const newState = { ...state };
      newState.adminList = payload;
      return newState;
    },
    deleteAdmin(state, { payload }) {
      const newState = { ...state };
      const index = newState.adminList.indexOf(payload);
      const arr = [...newState.adminList];
      arr.splice(index, 1);
      newState.adminList = arr;
      return newState;
    },
    updateAdmin(state, { payload }) {
      const newState = { ...state };
      const index = newState.adminList.findIndex(
        (item) => item._id === payload.adminInfo._id,
      );
      newState.adminList[index] = {
        ...newState.adminList[index],
        ...payload.newAdminInfo,
      };
      return newState;
    },
    addAdmin(state, { payload }) {
      const newState = { ...state };
      newState.adminList.push(payload);
      return newState;
    },
  },
  // 处理异步副作用
  effects: {
    // 第一个参数表示外界传入的额外参数
    *_initAdminList(_, { call, put }) {
      // 1. 发送请求获取所有的管理员信息
      const { data } = yield call(AdminController.getAdmins);
      // 2. 调用 reducers 更新仓库状态数据
      yield put({
        type: 'initAdminList',
        payload: data,
      });
    },
    *_deleteAdmin({ payload }, { call, put }) {
      yield call(AdminController.deleteAdmin, payload._id);
      yield put({
        type: 'deleteAdmin',
        payload,
      });
    },
    *_updateAdmin({ payload }, { call, put }) {
      yield call(
        AdminController.updateAdmin,
        payload.adminInfo._id,
        payload.newAdminInfo,
      );
      yield put({
        type: 'updateAdmin',
        payload,
      });
    },
    *_addAdmin({ payload }, { call, put }) {
      const { data } = yield call(AdminController.addAdmin, payload);
      console.log('🚀 ~ _addAdmin ~ data:', data);
      yield put({
        type: 'addAdmin',
        payload: data,
      });
    },
  },
};
