import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message, Modal, Popconfirm, Switch, Tag } from 'antd';
import { useEffect, useState } from 'react';
import AdminForm from './components/adminForm';

function AdminList() {
  const dispatch = useDispatch();
  const { adminList } = useSelector((state) => state.admin);
  const [adminInfo, setAdminInfo] = useState(null);

  const switchChange = (adminInfo, value) => {
    dispatch({
      type: 'admin/_updateAdmin',
      payload: {
        adminInfo,
        newAdminInfo: {
          enabled: value,
        },
      },
    });
    value ? message.success('管理员状态已激活') : message.error('管理员已禁用');
  };

  const deleteHandle = (adminInfo) => {
    dispatch({
      type: 'admin/_deleteAdmin',
      payload: adminInfo,
    });
    message.success('删除成功');
  };

  const columns = [
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
      valueType: 'avatar',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (_, row) => {
        let tag =
          row.permission === 1 ? (
            <Tag
              color="orange"
              key={row._id}
            >
              超级管理员
            </Tag>
          ) : (
            <Tag
              color="blue"
              key={row._id}
            >
              普通管理员
            </Tag>
          );
        return tag;
      },
    },
    {
      title: '账号操作',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      render: (_, row) => {
        return (
          <Switch
            key={row._id}
            size="small"
            defaultChecked={row.enabled}
            onChange={(value) => {
              switchChange(row, value);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      align: 'center',
      render: (_, row) => {
        return (
          <div key={row._id}>
            <Button
              type="link"
              size="small"
              onClick={() => {
                showModal(row);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定删除该管理员吗？"
              onConfirm={() => deleteHandle(row)}
              okText="确定"
              cancelText="取消"
            >
              {' '}
              <Button
                type="link"
                size="small"
              >
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  function showModal(row) {
    setIsModalOpen(true);
    setAdminInfo(row);
  }

  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList.length]);

  function handleOK() {
    dispatch({
      type: 'admin/_updateAdmin',
      payload: {
        adminInfo,
        newAdminInfo: adminInfo,
      },
    });
    message.success('修改成功');
    setIsModalOpen(false);
  }
  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <PageContainer>
        <ProTable
          headerTitle="管理员列表"
          search={false}
          dataSource={adminList}
          rowKey={(row) => row?._id}
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
        ></ProTable>
      </PageContainer>
      <Modal
        title="修改管理员信息"
        open={isModalOpen}
        onOK={handleOK}
        onCancel={handleCancel}
      >
        <AdminForm
          type="edit"
          adminInfo={adminInfo}
          setAdminInfo={setAdminInfo}
          submitHandle={handleOK}
        />
      </Modal>
    </div>
  );
}

export default AdminList;
