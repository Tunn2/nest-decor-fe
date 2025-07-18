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
  Descriptions,
  Divider,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [detailModal, setDetailModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Orders?pageIndex=${page}`
      );
      const rawOrders = res.data.items || [];
      setTotalCount(res.data.totalCount || 0);

      const userMap = {};
      const enrichedOrders = await Promise.all(
        rawOrders.map(async (order) => {
          const uid = order.userId;
          if (!userMap[uid]) {
            const [userRes, userOrdersRes] = await Promise.all([
              axios.get(`${import.meta.env.VITE_BASE_URL}/Users/${uid}`),
              axios.get(`${import.meta.env.VITE_BASE_URL}/Orders/user/${uid}`),
            ]);
            const phone =
              userOrdersRes.data.items?.[0]?.shippingDetail?.phoneNumber ||
              "N/A";
            userMap[uid] = {
              fullName: userRes.data.fullName,
              email: userRes.data.email,
              phone,
            };
          }
          const user = userMap[uid];
          return {
            ...order,
            userFullName: user.fullName,
            userEmail: user.email,
            userPhoneNumber: user.phone,
          };
        })
      );

      setOrders(enrichedOrders);
      setCurrentPage(page);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersByUser = async () => {
    if (!userId) {
      fetchOrders(1);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Orders/user/${userId}`
      );
      const rawOrders = res.data.items || [];

      const userRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Users/${userId}`
      );
      const user = {
        fullName: userRes.data.fullName,
        email: userRes.data.email,
        phone:
          rawOrders?.[0]?.shippingDetail?.phoneNumber ||
          "N/A",
      };

      const enrichedOrders = rawOrders.map((order) => ({
        ...order,
        userFullName: user.fullName,
        userEmail: user.email,
        userPhoneNumber: user.phone,
      }));

      setOrders(enrichedOrders);
      setTotalCount(enrichedOrders.length);
      setCurrentPage(1);
    } catch (error) {
      message.error("Không thể tải đơn theo user");
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
      message.error("Không thể tải chi tiết đơn hàng");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/Orders/${orderId}/status?status=${newStatus}`
      );
      message.success("Cập nhật trạng thái thành công");
      fetchOrders(currentPage);
    } catch (err) {
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
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "SĐT User",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
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
      title={<Title level={4}>🛠️ Quản lý đơn hàng (Admin)</Title>}
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
        <Button onClick={() => fetchOrders(1)}>Tải tất cả đơn</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: (page) => fetchOrders(page),
        }}
      />

      <Modal
        open={detailModal}
        onCancel={() => setDetailModal(false)}
        footer={null}
        title="📋 Chi tiết đơn hàng"
      >
        {orderDetail ? (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="ID đơn hàng">
                {orderDetail.id}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                {orderDetail.userId}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">
                {dayjs(orderDetail.orderDate).format("HH:mm DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {orderDetail.status}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">
                {orderDetail.totalAmount?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">📦 Thông tin giao hàng</Divider>
            <Descriptions bordered column={1} size="small">
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
            <Descriptions bordered column={1} size="small">
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

export default OrderManagement;
