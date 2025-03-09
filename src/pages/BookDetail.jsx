import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useParams } from 'react-router';
import { getBookById, updateBook } from '../api/book';
import { useDispatch, useSelector } from 'react-redux';
import Discuss from '../components/Discuss';
import { Image, message, Modal } from 'antd';
import styles from '../css/BookDetail.module.css';
import { updateUserInfo } from '../redux/userSlice';
import { editUser } from '../api/user';

function BookDetail() {
  const { bookId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const { userInfo, isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      console.log(bookId);
      const { data } = await getBookById(bookId);
      setBookInfo(data);

      updateBook(data._id, {
        scanNumber: data.scanNumber + 1,
      });
    }
    fetchData();
  }, [bookId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();

  const handleOk = () => {
    if (userInfo.points - bookInfo.requirePoints < 0) {
      message.warning('积分不足');
    } else {
      // 积分是够的
      // 服务器扣积分
      editUser(userInfo._id, {
        points: userInfo.points - bookInfo.requirePoints,
      });
      // 本地仓库也需要更新
      dispatch(
        updateUserInfo({
          points: userInfo.points - bookInfo.requirePoints,
        }),
      );
      window.open(`${bookInfo.downloadLink}`);
      message.success('积分已扣除');
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageHeader title="书籍详情" />
      <div className={styles.bookInfoContainer}>
        <div className={styles.leftSide}>
          <div className={styles.img}>
            <Image
              height={350}
              src={bookInfo?.bookPic}
            />
          </div>
          <div className={styles.link}>
            <span>
              下载所需积分:{' '}
              <span className={styles.requirePoints}>
                {bookInfo?.requirePoints}
              </span>{' '}
              分
            </span>
            {isLogin ? (
              <div
                className={styles.downloadLink}
                onClick={showModal}
              >
                百度云下载地址
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.rightSide}>
          <h1 className={styles.title}>{bookInfo?.bookTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: bookInfo?.bookIntro }}></div>
        </div>
      </div>
      <div className={styles.comment}>
        <Discuss
          bookInfo={bookInfo}
          commentType={2}
          targetId={bookInfo?._id}
        />
      </div>
      <Modal
        title="重要提示"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          是否使用{' '}
          <span className={styles.requirePoints}>
            {bookInfo?.requirePoints}
          </span>{' '}
          积分下载此书籍？
        </p>
      </Modal>
    </div>
  );
}

export default BookDetail;
