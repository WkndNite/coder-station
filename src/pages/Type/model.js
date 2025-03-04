import TypeController from '@/services/type';

export default {
  namespace: 'type',
  state: {
    typeList: [],
  },
  reducers: {
    initTypeList(state, { payload }) {
      const newObj = { ...state };
      newObj.typeList = payload;
      return newObj;
    },
    addType(state, { payload }) {
      const newObj = { ...state };
      const arr = [...state.typeList];
      arr.push(payload);
      newObj.typeList = arr;
      return newObj;
    },
    deleteType(state, { payload }) {
      const newObj = { ...state };
      const index = state.typeList.indexOf(payload);
      const arr = [...state.typeList];
      arr.splice(index, 1);
      newObj.typeList = arr;
      return newObj;
    },
  },
  effects: {
    *_initTypeList(_, { call, put }) {
      const { data } = yield call(TypeController.getTypeList);
      yield put({ type: 'initTypeList', payload: data });
    },
    *_addType({ payload }, { call, put }) {
      const { data } = yield call(TypeController.addType, payload);
      yield put({ type: 'addType', payload: data });
    },
    *_deleteType({ payload }, { call, put }) {
      yield call(TypeController.deleteType, payload._id);
      yield put({ type: 'deleteType', payload });
    },
  },
};
