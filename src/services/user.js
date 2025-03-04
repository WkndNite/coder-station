import { request } from '@umijs/max';

function getUserByPage(params) {
  return request('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

function getUserById(userId) {
  return request(`/api/user/${userId}`, {
    method: 'GET',
  });
}

function addUser(newUserInfo) {
  newUserInfo.type = 'background';
  return request(`/api/user`, {
    method: 'POST',
    data: newUserInfo,
  });
}

function deleteUser(userId) {
  return request(`/api/user/${userId}`, {
    method: 'DELETE',
  });
}

function editUser(userId, newUserInfo) {
  return request(`/api/user/${userId}`, {
    method: 'PATCH',
    data: newUserInfo,
  });
}

export default { addUser, deleteUser, editUser, getUserById, getUserByPage };
