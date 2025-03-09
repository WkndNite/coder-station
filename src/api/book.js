import request from './request';

export function getBookByPage(params) {
  return request('/api/book', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export function getBookById(bookId) {
  return request(`/api/book/${bookId}`, {
    method: 'GET',
  });
}

export function updateBook(bookId, newBookInfo) {
  return request(`/api/book/${bookId}`, {
    method: 'PATCH',
    data: newBookInfo,
  });
}
