import BookController from '@/services/book';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import BookForm from './components/bookForm';

function AddBook() {
  const [newBookInfo, setNewBookInfo] = useState({
    bookTitle: '',
    bookIntro: '',
    downloadLink: '',
    requirePoints: '',
    bookPic: '',
    typeId: '',
  });

  const navigate = useNavigate();

  function submitHandle(info) {
    // 提交表单数据
    const res = BookController.addBook(info);
    message.success('添加书籍成功');
    navigate('/book/bookList');
  }

  return (
    <PageContainer>
      <div
        className="container"
        style={{ width: '1000px' }}
      >
        <BookForm
          type="add"
          bookInfo={newBookInfo}
          setBookInfo={setNewBookInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
}

export default AddBook;
