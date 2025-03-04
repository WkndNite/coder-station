import { request } from '@umijs/max';

function getAdmins() {
  return request('/api/admin', {
    method: 'GET',
  });
}

function deleteAdmin(adminId) {
  return request(`/api/admin/${adminId}`, {
    method: 'DELETE',
  });
}

function updateAdmin(adminId, newAdminInfo) {
  return request(`/api/admin/${adminId}`, {
    method: 'PATCH',
    data: newAdminInfo,
  });
}

function addAdmin(newAdminInfo) {
  return request('/api/admin', {
    method: 'POST',
    data: newAdminInfo,
  });
}

function adminIsExist(loginId) {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}

function getCaptcha() {
  return request('/res/captcha', {
    method: 'GET',
  });
}

function login(loginInfo) {
  return request('/api/admin/login', {
    method: 'POST',
    data: loginInfo,
  });
}

function getInfo() {
  return request('/api/admin/whoami', {
    method: 'GET',
  });
}

function getAdminById(adminId) {
  return request(`/api/admin/${adminId}`, {
    method: 'GET',
  });
}

export default {
  getAdmins,
  deleteAdmin,
  updateAdmin,
  addAdmin,
  adminIsExist,
  getCaptcha,
  login,
  getInfo,
  getAdminById,
};
