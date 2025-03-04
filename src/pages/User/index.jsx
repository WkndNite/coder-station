import UserController from '@/services/user';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, useAccess, useNavigate } from '@umijs/max';
import { Button, message, Popconfirm, Switch } from 'antd';
import { useRef, useState } from 'react';

function UserList() {
  // 需要维护分页数据一起被发送到服务器获取数据
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  function handlePageSizeChange(current, pageSize) {
    setPagination({
      current,
      pageSize,
    });
  }
  const access = useAccess();

  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      search: false,
      key: 'serialNumber',
    },
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
      search: false,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      valueType: 'image',
      search: false,
    },
    {
      title: '帐号状态',
      data: 'enabled',
      key: 'enabled',
      align: 'center',
      search: false,
      render: (_, row, index, action) => (
        <Switch
          key={row._id}
          defaultChecked={row.enabled}
          size="small"
          onChange={(checked) => {
            switchChange(row, checked);
          }}
        />
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 200,
      key: 'option',
      fixed: 'right',
      render: (_, row) => (
        <div>
          <Button
            type="link"
            size="small"
          >
            详情
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              navigate(`/user/editUser/${row._id}`);
            }}
          >
            编辑
          </Button>

          <Access accessible={access.SuperAdmin}>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => deleteHandle(row._id)}
            >
              <Button
                type="link"
                size="small"
              >
                删除
              </Button>
            </Popconfirm>
          </Access>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  function switchChange(row, checked) {
    UserController.editUser(row._id, { enabled: checked });
  }

  const tableRef = useRef();
  function deleteHandle(id) {
    UserController.deleteUser(id);
    message.success('删除成功');
    tableRef.current.reload();
  }

  return (
    <div>
      <PageContainer>
        <ProTable
          actionRef={tableRef}
          rowKey={(row) => row.id}
          headerTitle="用户列表"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            ...pagination,
            onChange: handlePageSizeChange,
          }}
          columns={columns}
          request={async (params) => {
            const result = await UserController.getUserByPage(params);
            return {
              data: result.data.data,
              success: !result.code,
              total: result.data.count,
            };
          }}
        ></ProTable>
      </PageContainer>
    </div>
  );
}

export default UserList;
