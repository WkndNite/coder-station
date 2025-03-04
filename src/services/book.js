import { request } from 'umi';
function getBooksByPage(params) {
  return request('/api/book', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

function getBookById(id) {
  return request(`/api/book/${id}`, {
    method: 'GET',
  });
}

function addBook(book) {
  return request('/api/book', {
    method: 'POST',
    data: book,
  });
}

function deleteBook(id) {
  return request(`/api/book/${id}`, {
    method: 'DELETE',
  });
}

function editBook(id, book) {
  return request(`/api/book/${id}`, {
    method: 'PATCH',
    data: book,
  });
}

export default {
  getBooksByPage,
  getBookById,
  addBook,
  deleteBook,
  editBook,
};
