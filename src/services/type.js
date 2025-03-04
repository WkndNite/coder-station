import { request } from 'umi';

function getTypeList() {
  return request('/api/type', {
    method: 'GET',
  });
}

function addType(newTypeInfo) {
  return request('/api/type', {
    method: 'POST',
    data: newTypeInfo,
  });
}

function deleteType(id) {
  return request(`/api/type/${id}`, {
    method: 'DELETE',
  });
}

function updateType(id, updateInfo) {
  return request(`/api/type/${id}`, {
    method: 'PATCH',
    data: updateInfo,
  });
}

export default { getTypeList, addType, deleteType, updateType };
