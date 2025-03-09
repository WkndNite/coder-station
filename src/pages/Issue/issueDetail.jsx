import { formatDate } from '@/utils/tool';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'umi';

import IssueController from '@/services/issue';
import UserController from '@/services/user';

function IssueDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [issueInfo, setIssueInfo] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [userName, setUserName] = useState(null);

  const { typeList } = useSelector((state) => state.type);

  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList',
    });
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await IssueController.getIssueById(id);
      console.log(data);
      setIssueInfo(data);
      const type = typeList.find((item) => item._id === data.typeId);
      setTypeName(type?.typeName);
      const result = await UserController.getUserById(data.userId);
      console.log(result);
      setUserName(result.data?.nickname || '用户已注销');
    }
    fetchData();
  }, []);

  return (
    <PageContainer>
      <div
        className="container"
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Card
          title={issueInfo?.issueTitle}
          bordered={false}
          style={{
            marginTop: 20,
          }}
          extra={
            <Tag
              color="purple"
              key={issueInfo?.typeId}
            >
              {typeName}
            </Tag>
          }
        >
          <h2>提问用户</h2>
          <p>
            <Tag
              color="volcano"
              key={issueInfo?.userId}
            >
              {userName}
            </Tag>
          </p>
          <h2>问题描述</h2>
          <p>
            <div
              dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}
            ></div>
          </p>
          <h2>提问时间</h2>
          <p>{formatDate(issueInfo?.issueDate)}</p>
          <h3>浏览数：{issueInfo?.scanNumber}</h3>
          <p></p>
          <h3>评论数：{issueInfo?.scanNumber}</h3>
        </Card>
      </div>
    </PageContainer>
  );
}

export default IssueDetail;
