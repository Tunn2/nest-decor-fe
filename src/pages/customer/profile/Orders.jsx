import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Tag, Typography, Space } from "antd";
import { selectUser } from "../../../redux/features/authSlice";
const { Title } = Typography;

const Orders = () => {
  const reduxUser = useSelector(selectUser);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || localUser;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!user?.id) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/Orders/user/${user.id}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy đơn hàng:", err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN").format(value) + " ₫";

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => formatVND(amount),
    },
    {
      title: "Người nhận",
      dataIndex: ["shippingDetail", "fullName"],
      key: "fullName",
    },
    {
      title: "SĐT",
      dataIndex: ["shippingDetail", "phoneNumber"],
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: ["shippingDetail", "address"],
      key: "address",
    },
  ];

  const expandedRowRender = (order) => {
    const itemColumns = [
      {
        title: "Mã sản phẩm",
        dataIndex: "furnitureId",
        key: "furnitureId",
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Kích thước (DxRxC)",
        key: "size",
        render: (_, record) =>
          `${record.customLength}x${record.customWidth}x${record.customHeight}`,
      },
      {
        title: "Đơn giá",
        dataIndex: "unitPrice",
        render: (val) => formatVND(val),
      },
      {
        title: "Thành tiền",
        dataIndex: "subTotal",
        render: (val) => formatVND(val),
      },
    ];
    return (
      <Table
        columns={itemColumns}
        dataSource={order.orderItems}
        pagination={false}
        rowKey={(item) =>
          `${order.id}-${item.furnitureId}-${item.customLength}`
        }
      />
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Đơn hàng của tôi</Title>
      <Table
        loading={loading}
        dataSource={orders}
        columns={columns}
        expandable={{ expandedRowRender }}
        rowKey="id"
        bordered
      />
    </div>
  );
};

export default Orders;
