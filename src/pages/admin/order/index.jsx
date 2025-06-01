import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Popconfirm,
  message,
  Card,
  Typography,
  Space,
  Layout,
  Breadcrumb,
  Input,
  Select,
  Row,
  Col,
  Badge,
  Statistic,
  Divider,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;

const rawData = [
  {
    key: "1",
    id: "DH001",
    customer: "Nguyễn Văn A",
    date: "2024-06-01",
    status: "Chờ xác nhận",
    total: 1500000,
    items: 3,
  },
  {
    key: "2",
    id: "DH002",
    customer: "Trần Thị B",
    date: "2024-06-02",
    status: "Đã giao",
    total: 2300000,
    items: 5,
  },
  {
    key: "3",
    id: "DH003",
    customer: "Lê Văn C",
    date: "2024-06-03",
    status: "Đã hủy",
    total: 500000,
    items: 1,
  },
  {
    key: "4",
    id: "DH004",
    customer: "Phạm Thị D",
    date: "2024-06-04",
    status: "Chờ xác nhận",
    total: 3200000,
    items: 7,
  },
  {
    key: "5",
    id: "DH005",
    customer: "Hoàng Văn E",
    date: "2024-06-05",
    status: "Đã giao",
    total: 1800000,
    items: 4,
  },
];

const statusMap = {
  "Chờ xác nhận": {
    color: "orange",
    icon: <ClockCircleOutlined />,
  },
  "Đã giao": {
    color: "green",
    icon: <CheckCircleOutlined />,
  },
  "Đã hủy": {
    color: "red",
    icon: <CloseCircleOutlined />,
  },
};

export default function OrderManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleDelete = (id) => {
    message.success(`Đã xóa đơn hàng ${id}`);
  };

  // Lọc dữ liệu theo search và status
  const data = rawData.filter(
    (item) =>
      (!search ||
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())) &&
      (!status || item.status === status)
  );

  // Tính toán thống kê
  const stats = {
    total: rawData.length,
    pending: rawData.filter((item) => item.status === "Chờ xác nhận").length,
    completed: rawData.filter((item) => item.status === "Đã giao").length,
    cancelled: rawData.filter((item) => item.status === "Đã hủy").length,
    revenue: rawData
      .filter((item) => item.status === "Đã giao")
      .reduce((sum, item) => sum + item.total, 0),
  };

  const columns = [
    {
      title: (
        <span>
          <FileTextOutlined style={{ color: "#1677ff", marginRight: 8 }} />
          Mã đơn hàng
        </span>
      ),
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Text strong style={{ color: "#1677ff", fontSize: "14px" }}>
          {id}
        </Text>
      ),
      width: 120,
    },
    {
      title: (
        <span>
          <UserOutlined style={{ color: "#595959", marginRight: 8 }} />
          Khách hàng
        </span>
      ),
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <Text strong style={{ color: "#262626" }}>
          {customer}
        </Text>
      ),
      width: 150,
    },
    {
      title: (
        <span>
          <CalendarOutlined style={{ color: "#595959", marginRight: 8 }} />
          Ngày tạo
        </span>
      ),
      dataIndex: "date",
      key: "date",
      render: (date) => <Text style={{ color: "#8c8c8c" }}>{date}</Text>,
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const s = statusMap[status] || { color: "default", icon: null };
        return (
          <Tag
            color={s.color}
            icon={s.icon}
            style={{
              fontWeight: 500,
              fontSize: "13px",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            {status}
          </Tag>
        );
      },
      filters: [
        { text: "Chờ xác nhận", value: "Chờ xác nhận" },
        { text: "Đã giao", value: "Đã giao" },
        { text: "Đã hủy", value: "Đã hủy" },
      ],
      onFilter: (value, record) => record.status === value,
      width: 140,
    },
    {
      title: (
        <span>
          <ShoppingCartOutlined style={{ color: "#595959", marginRight: 8 }} />
          SL
        </span>
      ),
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <Badge
          count={items}
          style={{
            backgroundColor: "#f5f5f5",
            color: "#595959",
            border: "1px solid #d9d9d9",
          }}
        />
      ),
      width: 80,
      align: "center",
    },
    {
      title: (
        <span>
          <DollarOutlined style={{ color: "#595959", marginRight: 8 }} />
          Tổng tiền
        </span>
      ),
      dataIndex: "total",
      key: "total",
      render: (total) => (
        <Text strong style={{ color: "#52c41a", fontSize: "14px" }}>
          {total.toLocaleString("vi-VN")}₫
        </Text>
      ),
      sorter: (a, b) => a.total - b.total,
      width: 130,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            style={{ borderRadius: "4px" }}
          >
            Xem
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc muốn xóa đơn hàng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              style={{ borderRadius: "4px" }}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 140,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Header
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "0 32px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Title
          level={2}
          style={{
            margin: 0,
            color: "#1677ff",
            lineHeight: "64px",
            display: "inline-block",
            fontWeight: 600,
          }}
        >
          <FileTextOutlined style={{ marginRight: 12 }} />
          Quản lý đơn hàng
        </Title>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Breadcrumb style={{ marginBottom: 24 }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
        </Breadcrumb>

        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: "center", borderRadius: "8px" }}>
              <Statistic
                title="Tổng đơn hàng"
                value={stats.total}
                valueStyle={{ color: "#1677ff", fontWeight: 600 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: "center", borderRadius: "8px" }}>
              <Statistic
                title="Chờ xác nhận"
                value={stats.pending}
                valueStyle={{ color: "#fa8c16", fontWeight: 600 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: "center", borderRadius: "8px" }}>
              <Statistic
                title="Đã giao"
                value={stats.completed}
                valueStyle={{ color: "#52c41a", fontWeight: 600 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: "center", borderRadius: "8px" }}>
              <Statistic
                title="Doanh thu"
                value={stats.revenue}
                formatter={(value) => `${value.toLocaleString("vi-VN")}₫`}
                valueStyle={{
                  color: "#52c41a",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          bodyStyle={{ padding: "24px" }}
        >
          {/* Toolbar */}
          <Row gutter={16} align="middle" style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={8}>
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Tìm kiếm theo tên khách hoặc mã đơn..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="middle"
                style={{ borderRadius: "6px" }}
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                allowClear
                placeholder="Lọc trạng thái"
                value={status || undefined}
                onChange={setStatus}
                size="middle"
                style={{ width: "100%" }}
              >
                <Option value="Chờ xác nhận">Chờ xác nhận</Option>
                <Option value="Đã giao">Đã giao</Option>
                <Option value="Đã hủy">Đã hủy</Option>
              </Select>
            </Col>
            <Col
              xs={12}
              sm={6}
              md={4}
              // offset={md ? 8 : 0}
              style={{ textAlign: "right" }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="middle"
                style={{ borderRadius: "6px", fontWeight: 500 }}
              >
                Tạo đơn mới
              </Button>
            </Col>
          </Row>

          <Divider style={{ margin: "16px 0" }} />

          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} đơn hàng`,
              size: "default",
            }}
            bordered
            size="middle"
            scroll={{ x: 800 }}
            style={{ borderRadius: "6px" }}
          />
        </Card>

        <style>{`
          .ant-table-thead > tr > th {
            background: #fafafa !important;
            font-weight: 600 !important;
            color: #262626 !important;
            border-bottom: 2px solid #f0f0f0 !important;
          }
          
          .ant-table-tbody > tr:hover td {
            background: #f5f8ff !important;
          }
          
          .ant-card {
            border: 1px solid #f0f0f0;
          }
          
          .ant-statistic-title {
            color: #8c8c8c !important;
            font-weight: 500 !important;
          }
          
          .ant-btn-primary {
            background: #1677ff;
            border-color: #1677ff;
          }
          
          .ant-btn-primary:hover {
            background: #4096ff;
            border-color: #4096ff;
          }
        `}</style>
      </Content>
    </Layout>
  );
}
