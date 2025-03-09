import { request } from 'umi';

function getIssueByPage(params) {
  return request('/api/issue', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

function getIssueById(issueId) {
  return request(`/api/issue/${issueId}`, {
    method: 'GET',
  });
}

function deleteIssue(issueId) {
  return request(`/api/issue/${issueId}`, {
    method: 'DELETE',
  });
}

function editIssue(issueId, issueInfo) {
  return request(`/api/issue/${issueId}`, {
    method: 'PATCH',
    data: issueInfo,
  });
}

export default {
  getIssueByPage,
  getIssueById,
  deleteIssue,
  editIssue,
};
