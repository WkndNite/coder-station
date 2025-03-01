import RouteConfig from '.';
import RouteBeforeConfig from './RouteBeforeConfig';
import { Alert } from 'antd';

function RouteBefore() {
  console.log(location.pathname);
  const currentPath = RouteBeforeConfig.filter(
    (item) => item.path === location.pathname,
  )[0];

  if (currentPath.needLogin && !localStorage.getItem('userToken')) {
    return (
      <Alert
        message="请先登录"
        type="warning"
        closable
        onClose={() => {
          location.pathname = '/';
        }}
      />
    );
  }

  return <RouteConfig />;
}

export default RouteBefore;
