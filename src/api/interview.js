import request from './request';

export function getInterviewTitle() {
  return request({
    url: 'api/interview/interviewTitle',
    method: 'GET',
  });
}

export function getInterviewById(interviewId) {
  return request({
    url: `api/interview/${interviewId}`,
    method: 'GET',
  });
}
