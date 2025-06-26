import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Typography,
  message,
  Select,
  Input,
  Space,
  Button,
  Modal,
  Descriptions, Divider
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const StaffOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [detailModal, setDetailModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/Orders`);
      setOrders(res.data.items || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersByUser = async () => {
    if (!userId) {
      fetchOrders();
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Orders/user/${userId}`
      );
      setOrders(res.data.items || []);
    } catch (error) {
      console.error("Lỗi khi lấy đơn theo user:", error);
      message.error("Không thể tải đơn theo người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (orderId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Orders/${orderId}`
      );
      setOrderDetail(res.data);
      setDetailModal(true);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      message.error("Không thể tải chi tiết đơn hàng");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/Orders/${orderId}/status?status=${newStatus}`
      );
      message.success("Cập nhật trạng thái thành công");
      fetchOrders();
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      message.error("Không thể cập nhật trạng thái");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Khách hàng",
      dataIndex: "shippingDetail",
      key: "customer",
      render: (detail) => detail?.fullName || "N/A",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "total",
      render: (amount) =>
        amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 130 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) =>
        date ? dayjs(date).format("HH:mm DD/MM/YYYY") : "Không rõ",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <a onClick={() => handleViewDetail(record.id)}>Chi tiết</a>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4}>📦 Trang Quản lý đơn hàng cho Nhân viên</Title>}
      bordered={false}
      style={{ margin: "0 auto", background: "#fff", borderRadius: 8 }}
    >
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Nhập userId để tìm đơn"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button onClick={fetchOrdersByUser}>Tìm đơn theo userId</Button>
        <Button onClick={fetchOrders}>Tải tất cả đơn</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={detailModal}
        onCancel={() => setDetailModal(false)}
        footer={null}
        title="📝 Chi tiết đơn hàng"
      >
        {orderDetail ? (
          <>
            <Descriptions
              bordered
              column={1}
              size="small"
              labelStyle={{ fontWeight: "bold", width: 120 }}
            >
              <Descriptions.Item label="ID đơn hàng">{orderDetail.id}</Descriptions.Item>
              <Descriptions.Item label="User ID">{orderDetail.userId}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">
                {dayjs(orderDetail.orderDate).format("HH:mm DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{orderDetail.status}</Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">
                {orderDetail.totalAmount?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">📦 Thông tin giao hàng</Divider>
            <Descriptions
              bordered
              column={1}
              size="small"
              labelStyle={{ fontWeight: "bold", width: 120 }}
            >
              <Descriptions.Item label="Họ tên">
                {orderDetail.shippingDetail?.fullName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="SĐT">
                {orderDetail.shippingDetail?.phoneNumber || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {orderDetail.shippingDetail?.address || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Thành phố">
                {orderDetail.shippingDetail?.city || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Mã bưu điện">
                {orderDetail.shippingDetail?.postalCode || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">💳 Thanh toán</Divider>
            <Descriptions
              bordered
              column={1}
              size="small"
              labelStyle={{ fontWeight: "bold", width: 120 }}
            >
              <Descriptions.Item label="Phương thức">
                {orderDetail.payment?.method || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {orderDetail.payment?.status || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </>
        ) : (
          <p>Đang tải...</p>
        )}
      </Modal>
    </Card>
  );
};

export default StaffOrderManagement;
