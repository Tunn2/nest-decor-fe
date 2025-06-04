import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Popconfirm,
  message,
  Card,
  Typography,
  Avatar,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const API_URL = "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Users";

const getRandomColor = () => {
  const colors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#87d068"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export default function CustomerManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data.items || []);
    } catch (err) {
      message.error("Không thể tải danh sách người dùng!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredUsers = users.filter((user) => {
    return (
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const showModal = (user = null) => {
    setEditingUser(user);
    setIsModalVisible(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    message.success("Xóa người dùng thành công!");
  };

  const columns = [
    {
      title: "Người dùng",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: getRandomColor() }} size="large">
            {getInitials(record.fullName)}
          </Avatar>
          <div>
            <Text strong>{record.fullName}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {record.email}
              </Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <Card bordered={false}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space align="center">
              <Avatar style={{ backgroundColor: "#1890ff" }} icon={<TeamOutlined />} size={48} />
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  Quản lý người dùng
                </Title>
                <Text type="secondary">Quản lý tất cả người dùng trong hệ thống</Text>
              </div>
            </Space>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col flex="auto">
            <Input
              placeholder="Tìm kiếm theo tên hoặc email"
              prefix={<SearchOutlined />}
              value={search}
              onChange={handleSearch}
              allowClear
              size="large"
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Tổng cộng ${total} người dùng`,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          bordered
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
}
