import BookController from '@/services/book';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import BookForm from './components/bookForm';
function EditBook() {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await BookController.getBookById(id);
      setBookInfo(data);
      console.log(data);
    }
    if (id) {
      fetchData();
    }
  }, []);

  const navigate = useNavigate();

  function submitHandle(info) {
    const res = BookController.editBook(id, info);
    message.success('更新书籍成功');
    navigate('/book/bookList');
  }

  return (
    <PageContainer>
      <div
        className="container"
        style={{ width: '1000px' }}
      >
        <BookForm
          type="edit"
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
}

export default EditBook;
