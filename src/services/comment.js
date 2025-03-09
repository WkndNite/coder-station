import { request } from 'umi';

function getCommentByType(params, commentType) {
  console.log(commentType);
  return request(`/api/comment/${commentType}`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

function deleteComment(commentId) {
  return request(`/api/comment/${commentId}`, {
    method: 'DELETE',
  });
}

export default {
  getCommentByType,
  deleteComment,
};
