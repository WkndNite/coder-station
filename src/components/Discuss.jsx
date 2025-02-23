import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Comment,
  Form,
  List,
  message,
  Tooltip,
  Pagination,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Editor } from "@toast-ui/react-editor";
import { addIssueComment, getIssueCommentsById } from "../api/comment";
import { getUserById } from "../api/user";
import { formatDate } from "../utils/tools";
import { updateIssue } from "../api/issue";
import { updateUserInfoAsync } from "../redux/userSlice";
import styles from "../css/Discuss.module.css"

export default function Discuss(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  const avatarTag = isLogin ? (
    <Avatar src={userInfo.avatar} />
  ) : (
    <Avatar icon={<UserOutlined />} />
  );

  const editorRef = useRef(null);
  const [commentList, setCommentList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const dispatch = useDispatch();
  const onSubmit = async () => {
    let newComment = null;
    if (props.commentType === 1) {
      newComment = editorRef.current.getInstance().getHTML();
      if (newComment === "<p><br></p>") {
        newComment = "";
      }
    } else if (props.commentType === 2) {
    }

    if (!newComment) {
      message.warning("评论内容不能为空");
      return;
    }

    addIssueComment({
      userId: userInfo._id,
      typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
      commentContent: newComment,
      commentType: props.commentType,
      bookId: null,
      issueId: props.targetId,
    });
    setRefresh(!refresh);
    editorRef.current.getInstance().setHTML("");
    message.success("评论成功");
    updateIssue(props.targetId, {
      commentNumber: props.issueInfo
        ? ++props.issueInfo.commentNumber
        : ++props.bookInfo.commentNumber,
    });

    dispatch(
      updateUserInfoAsync({
        userId: userInfo._id,
        newInfo: {
          points: userInfo.points + 4,
        },
      })
    );
  };

  const [refresh, setRefresh] = useState(false);

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
          item.userInfo = response.data;
          return item;
        })
      );

      setCommentList(updatedComments);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }

    if (props.targetId) {
      fetchComments();
    }
  }, [props.targetId, refresh]);

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
              <Button type="primary" onClick={onSubmit}>
                添加评论
              </Button>
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

      {commentList.length > 0 ? (
        <div className={styles.paginationContainer}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={pageInfo.total}
            pageSize={pageInfo.pageSize}
          />
        </div>
      ) : (
        <div
          style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px",
          }}
        >
          暂无评论
        </div>
      )}
    </div>
  );
}
