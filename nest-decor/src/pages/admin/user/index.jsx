import React from "react";
import { Table } from "antd";

const UserManagement = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
    },
    {
      key: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default UserManagement;