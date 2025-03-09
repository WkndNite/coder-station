import IssueController from '@/services/issue';
import { typeOptionCreator } from '@/utils/tool';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Select, Switch, Tag } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'umi';

function Book() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  const actionRef = useRef();
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState({
    typeId: null,
  });

  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList',
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
      title: '问答标题',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      render: (_, row) => {
        let brief = null;
        if (row.issueTitle.length > 22) {
          brief = row.issueTitle.slice(0, 22) + '...';
        } else {
          brief = row.issueTitle;
        }
        return [brief];
      },
    },
    {
      title: '问答描述',
      dataIndex: 'issueContent',
      key: 'issueContent',
      search: false,
      render: (_, row) => {
        // 将问答描述的文字进行简化
        // 在表格中显示书问答描述时，过滤掉 html 标签
        let reg = /<[^<>]+>/g;
        let brief = row.issueContent;
        brief = brief.replace(reg, '');

        if (brief.length > 30) {
          brief = brief.slice(0, 30) + '...';
        }
        return [brief];
      },
    },
    {
      title: '浏览数',
      dataIndex: 'scanNumber',
      key: 'scanNumber',
      align: 'center',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentNumber',
      key: 'commentNumber',
      align: 'center',
      search: false,
    },
    {
      title: '问题分类',
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
      title: '审核状态',
      dataIndex: 'issueStatus',
      key: 'issueStatus',
      align: 'center',
      render: (_, row, index, action) => {
        const defaultChecked = row.issueStatus ? true : false;
        return [
          <Switch
            key={row._id}
            defaultChecked={defaultChecked}
            size="small"
            onChange={(value) => switchChange(row, value)}
          />,
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
              onClick={() => navigate(`/issue/${row._id}`)}
            >
              详情
            </Button>
            <Popconfirm
              title="是否要删除该问答以及该问答对应的评论？"
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

  function handleChange(value) {
    setSearchType({
      typeId: value,
    });
  }

  /**
   *
   * @param {*} page 当前页
   * @param {*} pageSize 每页条数
   */
  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize,
    });
  }

  function deleteHandle(issueInfo) {
    IssueController.deleteIssue(issueInfo._id);
    actionRef.current.reload();
    message.success('删除成功');
  }

  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="书籍列表"
          actionRef={actionRef}
          columns={columns}
          rowKey={(row) => row._id}
          params={searchType}
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
            const result = await IssueController.getIssueByPage(params);
            return {
              data: result.data.data,
              success: !result.code,
              total: result.data.count,
            };
          }}
        />
      </PageContainer>
    </>
  );
}

export default Book;
