import React, { useEffect, useState } from "react";
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
  Modal,
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
import styles from "./OrderManagement.module.css";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;

const API_URL =
  "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Orders";

const statusMap = {
  "Chờ xác nhận": { color: "orange", icon: <ClockCircleOutlined /> },
  "Đã giao": { color: "green", icon: <CheckCircleOutlined /> },
  "Đã hủy": { color: "red", icon: <CloseCircleOutlined /> },
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setOrders(data.items || []);
    } catch (err) {
      message.error("Không thể tải đơn hàng!", err.message);
    }
  };

  const fetchOrderDetail = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setSelectedOrder(data);
      setModalVisible(true);
    } catch (err) {
      message.error("Không thể tải chi tiết đơn hàng!", err.message);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        message.success("Cập nhật trạng thái thành công");
        fetchOrders();
      } else {
        throw new Error();
      }
    } catch {
      message.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    message.success(`Đã xóa đơn hàng ${id}`);
  };

  const filtered = orders.filter(
    (item) =>
      (!search ||
        item.customer?.toLowerCase().includes(search.toLowerCase()) ||
        item.id?.toLowerCase().includes(search.toLowerCase())) &&
      (!status || item.status === status)
  );

  const stats = {
    total: orders.length,
    pending: orders.filter((item) => item.status === "Chờ xác nhận").length,
    completed: orders.filter((item) => item.status === "Đã giao").length,
    cancelled: orders.filter((item) => item.status === "Đã hủy").length,
    revenue: orders
      .filter((item) => item.status === "Đã giao")
      .reduce((sum, item) => sum + item.total, 0),
  };

  const columns = [
    {
      title: (
        <span>
          <FileTextOutlined className={styles.icon} />
          Mã đơn hàng
        </span>
      ),
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Text strong className={styles.code}>
          {id}
        </Text>
      ),
      width: 120,
    },
    {
      title: (
        <span>
          <UserOutlined className={styles.icon} />
          Khách hàng
        </span>
      ),
      dataIndex: "customer",
      key: "customer",
      render: (text) => <Text strong>{text}</Text>,
      width: 150,
    },
    {
      title: (
        <span>
          <CalendarOutlined className={styles.icon} />
          Ngày tạo
        </span>
      ),
      dataIndex: "date",
      key: "date",
      render: (text) => <Text type="secondary">{text}</Text>,
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const s = statusMap[status] || {};
        return (
          <Tag icon={s.icon} color={s.color} className={styles.status}>
            {status}
          </Tag>
        );
      },
      width: 140,
    },
    {
      title: (
        <span>
          <ShoppingCartOutlined className={styles.icon} />
          SL
        </span>
      ),
      dataIndex: "items",
      key: "items",
      render: (items) => <Badge count={items} className={styles.badge} />,
      width: 80,
      align: "center",
    },
    {
      title: (
        <span>
          <DollarOutlined className={styles.icon} />
          Tổng tiền
        </span>
      ),
      dataIndex: "total",
      key: "total",
      render: (value) => (
        <Text strong style={{ color: "#52c41a" }}>
          {value.toLocaleString("vi-VN")}₫
        </Text>
      ),
      width: 130,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => fetchOrderDetail(record.id)}
          >
            Xem
          </Button>
          <Popconfirm
            title="Xác nhận xóa đơn hàng này?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 140,
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title level={2} className={styles.title}>
          <FileTextOutlined /> Quản lý đơn hàng
        </Title>
      </Header>
      <Content className={styles.content}>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Đơn hàng</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={16} className={styles.statsRow}>
          <Col span={6}>
            <Card>
              <Statistic title="Tổng đơn hàng" value={stats.total} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Chờ xác nhận"
                value={stats.pending}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Đã giao"
                value={stats.completed}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Doanh thu"
                value={stats.revenue}
                formatter={(value) => `${value.toLocaleString("vi-VN")}₫`}
              />
            </Card>
          </Col>
        </Row>

        <Card className={styles.tableCard}>
          <Row gutter={16} className={styles.toolbar}>
            <Col span={8}>
              <Input
                placeholder="Tìm theo mã/khách hàng..."
                prefix={<SearchOutlined />}
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="Lọc trạng thái"
                allowClear
                value={status || undefined}
                onChange={setStatus}
                style={{ width: "100%" }}
              >
                <Option value="Chờ xác nhận">Chờ xác nhận</Option>
                <Option value="Đã giao">Đã giao</Option>
                <Option value="Đã hủy">Đã hủy</Option>
              </Select>
            </Col>
            <Col span={4} offset={6} style={{ textAlign: "right" }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo đơn mới
              </Button>
            </Col>
          </Row>
          <Divider />
          <Table
            columns={columns}
            dataSource={filtered}
            pagination={{ pageSize: 10 }}
            rowKey="id"
          />
        </Card>

        <Modal
          title={`Chi tiết đơn hàng ${selectedOrder?.id || ""}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {selectedOrder ? (
            <div>
              <p>
                <strong>Khách hàng:</strong> {selectedOrder.customer}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {selectedOrder.total?.toLocaleString("vi-VN")}₫
              </p>
              <Button
                onClick={() => updateOrderStatus(selectedOrder.id, "Đã giao")}
                type="primary"
                style={{ marginRight: 8 }}
              >
                Đánh dấu đã giao
              </Button>
              <Button
                onClick={() => updateOrderStatus(selectedOrder.id, "Đã hủy")}
                danger
              >
                Hủy đơn
              </Button>
            </div>
          ) : null}
        </Modal>
      </Content>
    </Layout>
  );
}
