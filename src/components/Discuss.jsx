import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Comment, Form, List, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { ConsoleSqlOutlined, UserOutlined } from "@ant-design/icons";
import { Editor } from "@toast-ui/react-editor";
import { getIssueCommentsById } from "../api/comment";
import { getUserById } from "../api/user";
import { formatDate } from "../utils/tools";

export default function Discuss(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  const avatarTag = isLogin ? (
    <Avatar src={userInfo.avatar} />
  ) : (
    <Avatar src={<UserOutlined />} />
  );

  const editorRef = useRef(null);
  const [commentList, setCommentList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    async function fetchComments() {
      let data = null;
      if (props.commentType === 1) {
        const result = await getIssueCommentsById(props.targetId, {
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
        });
        data = result.data;
      } else if (props.commentType === 2) {
      }
      const updatedComments = await Promise.all(
        data.data.map(async (item) => {
          const response = await getUserById(item.userId);
          item.userInfo = response.data
          return item;
        })
      );

      setCommentList(updatedComments);
      setPageInfo({
        currentPage: data.currentPage,
        eachPage: data.eachPage,
        count: data.count,
        totalPage: data.totalPage,
      });
    }

    if (props.targetId) {
      fetchComments();
    }
  }, [props.targetId]);

  return (
    <div>
      <Comment
        avatar={avatarTag}
        content={
          <>
            <Form.Item>
              <Editor
                previewStyle="vertical"
                height="270px"
                initialEditType="wysiwyg"
                initialValue=""
                ref={editorRef}
                className="editor"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">添加评论</Button>
            </Form.Item>
          </>
        }
      />

      {commentList.length > 0 && (
        <List
          header={`${commentList.length} 条评论`}
          dataSource={commentList}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.userInfo.nickname}
                avatar={item.userInfo.avatar}
                content={
                  <div
                    dangerouslySetInnerHTML={{ __html: item.commentContent }}
                  ></div>
                }
                datetime={
                  <Tooltip title={formatDate(item.commentDate)}>
                    <span>{formatDate(item.commentDate, "year")}</span>
                  </Tooltip>
                }
              />
            </li>
          )}
        />
      )}
    </div>
  );
}
