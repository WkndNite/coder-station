import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import TypeSelect from '../components/TypeSelect';
import styles from '../css/Books.module.css';
import { Card, Pagination } from 'antd';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getBookByPage } from '../api/book';

const { Meta } = Card;

function Books(props) {
  const [bookInfo, setBookInfo] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });

  const pageSizeChangeHandler = (current, pageSize) => {
    setPageInfo({
      current,
      pageSize,
    });
  };

  const pageChangeHandler = (current, pageSize) => {
    setPageInfo({
      current,
      pageSize,
    });
  };

  const navigate = useNavigate();
  const { bookTypeId } = useSelector((state) => state.type);

  useEffect(() => {
    async function fetchData() {
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
      };
      if (bookTypeId !== 'all') {
        searchParams.typeId = bookTypeId;
        searchParams.current = 1;
      }
      const { data } = await getBookByPage(searchParams);
      setBookInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fetchData();
  }, [bookTypeId, pageInfo.current, pageInfo.pageSize]);

  const bookData = [];
  if (bookInfo.length) {
    bookInfo.forEach((item) => {
      bookData.push(
        <Card
          hoverable
          style={{
            width: 200,
            marginBottom: 30,
          }}
          cover={
            <img
              alt="example"
              style={{
                width: 160,
                height: 200,
                margin: 'auto',
                marginTop: 10,
              }}
              src={item?.bookPic}
            />
          }
          key={item._id}
          onClick={() => navigate(`/books/${item._id}`)}
        >
          <Meta title={item?.bookTitle} />
          <div className={styles.numberContainer}>
            <div>浏览数：{item?.scanNumber}</div>
            <div>评论数：{item?.commentNumber}</div>
          </div>
        </Card>,
      );
    });
  }

  return (
    <div>
      <PageHeader title="最新资源">
        <TypeSelect />
      </PageHeader>
      <div className={styles.bookContainer}>{bookData}</div>
      <div className="paginationContainer">
        {bookData.length > 0 ? (
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            {...pageInfo}
            pageSizeOptions={[5, 10, 15]}
            showSizeChanger
            onShowSizeChange={pageSizeChangeHandler}
            onChange={pageChangeHandler}
          />
        ) : (
          <div
            style={{
              fontSize: '26px',
              fontWeight: '200',
            }}
          >
            该分类下暂无书籍！
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
