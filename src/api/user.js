import request from './request';

export function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'GET',
  });
}

export function userHasExist(loginId) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: 'GET',
  });
}

export function register(registerInfo) {
  return request({
    url: '/api/user',
    method: 'POST',
    data: registerInfo,
  });
}

export function login(loginInfo) {
  return request({
    url: '/api/user/login',
    method: 'POST',
    data: loginInfo,
  });
}

export function getUserById(userId) {
  return request({
    url: `/api/user/${userId}`,
    method: 'GET',
  });
}

// 传递 localStorage 中的 token，获取用户id
export function getInfo() {
  return request({
    url: '/api/user/whoami',
    method: 'GET',
  });
}

export function getUserByPointRank() {
  return request({
    url: '/api/user/pointsrank',
    method: 'GET',
  });
}

export function editUser(userId, newUserInfo) {
  return request({
    url: `/api/user/${userId}`,
    method: 'PATCH',
    data: newUserInfo,
  });
}
