import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewTitleAsync } from '../redux/interviewSlice';
import { getTypeList } from '../redux/typeSlice';
import PageHeader from '../components/PageHeader';
import styles from '../css/Interview.module.css';
import { Tree, BackTop } from 'antd';
import { getInterviewById } from '../api/interview';

function Interviews(props) {
  const dispatch = useDispatch();
  const { interviewTitleList } = useSelector((state) => state.interview);
  const { typeList } = useSelector((state) => state.type);
  const [treeData, setTreeData] = useState([]);

  async function clickHandler(id) {
    const { data } = await getInterviewById(id);
    console.log(data);
    setInterviewInfo(data);
  }

  useEffect(() => {
    if (!interviewTitleList.length) {
      dispatch(getInterviewTitleAsync());
    }
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    if (typeList.length && interviewTitleList.length) {
      const arr = [];
      for (let i = 0; i < typeList.length; i++) {
        arr.push({
          title: (
            <h3
              style={{
                fontWeight: '200',
              }}
            >
              {typeList[i].typeName}
            </h3>
          ),
          key: i,
        });
      }

      for (let i = 0; i < interviewTitleList.length; i++) {
        const childArr = [];
        for (let j = 0; j < interviewTitleList[i].length; j++) {
          childArr.push({
            title: (
              <h4
                style={{
                  fontWeight: '200',
                }}
                onClick={() => {
                  clickHandler(interviewTitleList[i][j]._id);
                }}
              >
                {interviewTitleList[i][j].interviewTitle}
              </h4>
            ),
            key: `${i}-${j}`,
          });
        }
        arr[i].children = childArr;
      }
      setTreeData(arr);
    }
  }, [typeList, interviewTitleList]);

  let interviewRightSide = null;
  const [interviewInfo, setInterviewInfo] = useState(null);
  if (interviewInfo) {
    interviewRightSide = (
      <div>
        <h1 className={styles.interviewRightTitle}>
          {interviewInfo.interviewTitle}
        </h1>
        <div className={styles.contentContainer}>
          {' '}
          <div
            dangerouslySetInnerHTML={{ __html: interviewInfo.interviewContent }}
          ></div>
        </div>
      </div>
    );
  } else {
    interviewRightSide = (
      <div
        style={{
          textAlign: 'center',
          marginTop: '150px',
          fontSize: '40px',
          fontWeight: '200',
        }}
      >
        请在左侧选择面试题
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader title="面试题大全" />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <Tree treeData={treeData} />
        </div>
        <div className={styles.rightSide}>{interviewRightSide}</div>
      </div>
      <BackTop />
    </div>
  );
}

export default Interviews;
