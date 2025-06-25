import React, { useEffect, useState } from "react";
import { Card, Table, Typography, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;

const StaffOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Orders`
      );
      console.log("Kết quả trả về:", res.data);
      setOrders(res.data.items || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
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
        amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) =>
        date ? dayjs(date).format("HH:mm DD/MM/YYYY") : "Không rõ",
    },
  ];

  return (
    <Card
      title={<Title level={4}>📦 Trang Quản lý đơn hàng cho Nhân viên</Title>}
      bordered={false}
      style={{ margin: "0 auto", background: "#fff", borderRadius: 8 }}
    >
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default StaffOrderManagement;
