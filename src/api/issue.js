import request from "./request";

export function getIssuesByPage(params) {
  return request({
    url: "/api/issue",
    method: "GET",
    params: {
      ...params,
    },
  });
}

export function addIssue(newIssue){
  return request({
    url:'/api/issue',
    method:'POST',
    data:newIssue
  })
}