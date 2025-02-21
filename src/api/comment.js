import request from "./request";

export function getIssueCommentsById(issueId,params) {
  return request({
    url: `/api/comment/issuecomment/${issueId}`,
    method: "GET",
    params:{
        ...params
    }
  });
}