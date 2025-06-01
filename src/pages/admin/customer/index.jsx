import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Select,
  Popconfirm,
  message,
  Card,
  Typography,
  Avatar,
  Tag,
  Row,
  Col,
  Divider,
  Tooltip,
  Badge,
  Alert
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  EyeOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

// Generate random color for avatar
const getRandomColor = () => {
  const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Get initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const initialUsers = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    role: "Quản trị viên",
    status: "active",
    lastLogin: "2023-06-01 08:30"
  },
  { 
    key: "2", 
    name: "Trần Thị B", 
    email: "b@gmail.com", 
    role: "Người dùng",
    status: "active",
    lastLogin: "2023-05-28 14:15"
  },
  { 
    key: "3", 
    name: "Lê Văn C", 
    email: "c@gmail.com", 
    role: "Người dùng",
    status: "inactive",
    lastLogin: "2023-04-15 09:45"
  },
];

const CustomerManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [roleFilter, setRoleFilter] = useState(null);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredUsers = users.filter(
    (user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      
      return matchesSearch && matchesRole;
    }
  );

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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          setUsers((prev) =>
            prev.map((u) =>
              u.key === editingUser.key ? { ...editingUser, ...values } : u
            )
          );
          message.success("Cập nhật người dùng thành công!");
        } else {
          const newUser = {
            ...values,
            key: (Math.random() * 10000).toFixed(0),
            status: "active",
            lastLogin: "Chưa đăng nhập"
          };
          setUsers((prev) => [...prev, newUser]);
          message.success("Thêm người dùng thành công!");
        }
        handleCancel();
      })
      .catch(() => {});
  };

  const handleDelete = (key) => {
    setUsers((prev) => prev.filter((u) => u.key !== key));
    message.success("Xóa người dùng thành công!");
  };

  const columns = [
    {
      title: "Người dùng",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar 
            style={{ backgroundColor: getRandomColor() }}
            size="large"
          >
            {getInitials(record.name)}
          </Avatar>
          <div>
            <Text strong>{record.name}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "Quản trị viên" ? "blue" : "green"}>
          {role === "Quản trị viên" ? <SettingOutlined /> : <UserOutlined />} {role}
        </Tag>
      ),
      filters: [
        { text: 'Quản trị viên', value: 'Quản trị viên' },
        { text: 'Người dùng', value: 'Người dùng' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge 
          status={status === "active" ? "success" : "default"} 
          text={status === "active" ? "Đang hoạt động" : "Không hoạt động"} 
        />
      ),
    },
    {
      title: "Đăng nhập cuối",
      dataIndex: "lastLogin",
      key: "lastLogin",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => message.info(`Xem chi tiết người dùng: ${record.name}`)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xóa"
            cancelText="Hủy"
            placement="left"
          >
            <Tooltip title="Xóa">
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card bordered={false}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space align="center">
              <Avatar 
                style={{ backgroundColor: '#1890ff' }} 
                icon={<TeamOutlined />} 
                size={48}
              />
              <div>
                <Title level={3} style={{ margin: 0 }}>Quản lý người dùng</Title>
                <Text type="secondary">Quản lý tất cả người dùng trong hệ thống</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              <Tooltip title="Xuất dữ liệu">
                <Button icon={<ExportOutlined />}>Xuất</Button>
              </Tooltip>
              <Tooltip title="Nhập dữ liệu">
                <Button icon={<ImportOutlined />}>Nhập</Button>
              </Tooltip>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
              >
                Thêm người dùng
              </Button>
            </Space>
          </Col>
        </Row>
        
        <Divider style={{ margin: '12px 0' }} />
        
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
          <Col>
            <Select
              placeholder="Lọc theo vai trò"
              style={{ width: 180 }}
              allowClear
              onChange={(value) => setRoleFilter(value)}
              size="large"
            >
              <Option value="Quản trị viên">Quản trị viên</Option>
              <Option value="Người dùng">Người dùng</Option>
            </Select>
          </Col>
        </Row>
        
        <Table 
          columns={columns} 
          dataSource={filteredUsers} 
          rowKey="key"
          pagination={{ 
            pageSize: 5,
            showTotal: (total) => `Tổng cộng ${total} người dùng`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20']
          }}
          bordered
          style={{ marginTop: 16 }}
        />
      </Card>

      <Modal
        title={
          <Space>
            {editingUser ? <EditOutlined /> : <PlusOutlined />}
            <span>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</span>
          </Space>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
        centered
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Tên người dùng"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập tên đầy đủ" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="example@domain.com" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Vai trò"
                name="role"
                rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
              >
                <Select placeholder="Chọn vai trò">
                  <Option value="Quản trị viên">
                    <Space>
                      <SettingOutlined />
                      <span>Quản trị viên</span>
                    </Space>
                  </Option>
                  <Option value="Người dùng">
                    <Space>
                      <UserOutlined />
                      <span>Người dùng</span>
                    </Space>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          {!editingUser && (
            <Alert
              message="Thông báo"
              description="Mật khẩu mặc định sẽ được gửi đến email của người dùng."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;