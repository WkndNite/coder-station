import BookController from '@/services/book';
import CommentController from '@/services/comment';
import IssueController from '@/services/issue';
import UserController from '@/services/user';
import { typeOptionCreator } from '@/utils/tool';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message, Modal, Popconfirm, Radio, Select, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';

function Comment() {
  const [commentType, setCommentType] = useState(1);

  function onChange(e) {
    setCommentType(e.target.value);
    actionRef.current.reload();
  }

  const actionRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, []);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const { typeList } = useSelector((state) => state.type);

  function showModal(row) {
    setCommentInfo(row);
    setIsModalOpen(true);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function deleteHandle(commentInfo) {
    CommentController.deleteComment(commentInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除评论成功');
  }

  const [searchType, setSearchType] = useState({
    typeId: null,
  });

  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize,
    });
    actionRef.current.reload();
  }

  function handleChange(value) {
    setSearchType({
      typeId: value,
    });
  }
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      render: (text, record, index) => {
        return [(pagination.current - 1) * pagination.pageSize + index + 1];
      },
      search: false,
    },
    {
      title: commentType === 1 ? '问题标题' : '书籍标题',
      dataIndex: 'commentTitle',
      search: false,
      render: (_, row) => {
        const id = row.issueId ? row.issueId : row.bookId;
        const title = titleArr.find((item) => item?._id === id) || {};

        return [commentType === 1 ? title?.issueTitle : title?.bookTitle];
      },
    },
    {
      title: '评论内容',
      dataIndex: 'commentContent',
      key: 'commentContent',
      render: (_, row) => {
        // 将问答标题进行简化
        let brief = null;
        if (row.commentContent.length > 30) {
          brief = row.commentContent.slice(0, 30) + '...';
        } else {
          brief = row.commentContent;
        }
        return [brief];
      },
    },
    {
      title: '评论用户',
      align: 'center',
      dataIndex: 'nickname',
      search: false,
      render: (_, row) => {
        const user = userArr.find((item) => item?._id === row.userId);
        return [
          <Tag
            color="blue"
            key={row.userId}
          >
            {user?.nickname}
          </Tag>,
        ];
      },
    },
    {
      title: '评论分类',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      renderFormItem: (
        item,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          <Select
            placeholder="请选择查询分类"
            onChange={handleChange}
          >
            {typeOptionCreator(Select, typeList)}
          </Select>
        );
      },
      render: (_, row) => {
        // 寻找对应类型的类型名称
        const type = typeList.find((item) => item._id === row.typeId);
        return [
          <Tag
            color="purple"
            key={row.typeId}
          >
            {type.typeName}
          </Tag>,
        ];
      },
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row, index, action) => {
        return [
          <div key={row._id}>
            <Button
              type="link"
              size="small"
              onClick={() => showModal(row)}
            >
              详情
            </Button>
            <Popconfirm
              title="是否要删除该条评论？"
              onConfirm={() => deleteHandle(row)}
              okText="删除"
              cancelText="取消"
            >
              <Button
                type="link"
                size="small"
              >
                删除
              </Button>
            </Popconfirm>
          </div>,
        ];
      },
    },
  ];

  const [userArr, setUserArr] = useState([]);
  const [titleArr, setTitleArr] = useState([]);

  return (
    <>
      <PageContainer>
        <Radio.Group
          onChange={onChange}
          value={commentType}
          style={{
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Radio.Button
            value={1}
            defaultChecked
          >
            问答评论
          </Radio.Button>
          <Radio.Button value={2}>书籍评论</Radio.Button>
        </Radio.Group>
        <ProTable
          headerTitle="评论列表"
          actionRef={actionRef}
          columns={columns}
          params={searchType}
          rowKey={(row) => row._id}
          onReset={() => {
            setSearchType({
              typeId: null,
            });
          }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            ...pagination,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            const result = await CommentController.getCommentByType(
              params,
              commentType,
            );
            const tableData = result.data.data;

            const userArr = [];
            const titleArr = [];
            for (const item of tableData) {
              const userId = item.userId;
              const { data } = await UserController.getUserById(userId);
              userArr.push(data);
              const id = item.issueId ? item.issueId : item.bookId;
              if (commentType === 1) {
                const { data } = await IssueController.getIssueById(id);
                titleArr.push(data);
              } else {
                const { data } = await BookController.getBookById(id);
                titleArr.push(data);
              }
            }

            setUserArr(userArr);
            setTitleArr(titleArr);

            console.log(userArr);

            return {
              data: tableData,
              success: !result.code,
              total: result.data.count,
            };
          }}
        />
      </PageContainer>
      <Modal
        title="评论详情"
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ top: 50 }}
        footer={false}
      >
        <h3>标题</h3>
      </Modal>
    </>
  );
}

export default Comment;
