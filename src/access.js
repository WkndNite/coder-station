export default (initialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  if (!initialState.adminInfo)
    return {
      NormalAdmin: false,
      SuperAdmin: false,
    };
  return {
    NormalAdmin:
      initialState.adminInfo.permission === 1 ||
      initialState.adminInfo.permission === 2,
    SuperAdmin: initialState.adminInfo?.permission === 1,
  };
};
