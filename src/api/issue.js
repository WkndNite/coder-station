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

export function getIssueById(issueId){
  return request({
    url:`/api/issue/${issueId}`,
    method:'GET'
  })
}

export function updateIssue(issueId,newIssueInfo){
  return request({
    url:`/api/issue/${issueId}`,
    method:'PATCH',
    data:newIssueInfo
  })
}