import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Spin, Table, message } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/Admin/dashboard`);
        setData(res.data);
      } catch (err) {
        message.error("Không thể tải dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    };

    const fetchTopSelling = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/Admin/top-selling`);
        setProducts(res.data);
      } catch (err) {
        message.error("Không thể tải sản phẩm bán chạy");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchDashboard();
    fetchTopSelling();
  }, []);

  const colors = ["#69c0ff", "#ff7875", "#95de64", "#ffd666"];
  const chartData = data
    ? [
        { name: "Users", value: data.totalUsers },
        { name: "Orders", value: data.totalOrders },
        { name: "Revenue", value: data.totalRevenue },
        { name: "Products", value: data.totalProducts },
      ]
    : [];

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "furnitureName",
      key: "furnitureName",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "totalSold",
      key: "totalSold",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenueGenerated",
      key: "revenueGenerated",
      render: (v) => `${v.toLocaleString()} ₫`,
    },
  ];

  if (loading)
    return (
      <Spin tip="Đang tải dữ liệu thống kê..." style={{ margin: "50px auto", display: "block" }} />
    );

  return (
    <div style={{ padding: "24px", background: "#f5f7fa", minHeight: "100vh" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered style={softCardStyle}>
            <Statistic title="Total Users" value={data.totalUsers} valueStyle={softValueStyle} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered style={softCardStyle}>
            <Statistic title="Total Orders" value={data.totalOrders} valueStyle={softValueStyle} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered style={softCardStyle}>
            <Statistic
              title="Total Revenue"
              value={data.totalRevenue}
              suffix="₫"
              valueStyle={{ ...softValueStyle, color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered style={softCardStyle}>
            <Statistic title="Total Products" value={data.totalProducts} valueStyle={softValueStyle} />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Card title="Biểu đồ tổng quan" style={softCardStyle}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Card title="Sản phẩm bán chạy nhất" style={softCardStyle}>
            {loadingProducts ? (
              <Spin tip="Đang tải bảng sản phẩm..." />
            ) : (
              <Table
                rowKey="furnitureId"
                columns={columns}
                dataSource={products}
                pagination={{ pageSize: 5 }}
                bordered
                size="middle"
                style={{ borderRadius: "8px" }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const softCardStyle = {
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
  background: "#fff",
};

const softValueStyle = {
  fontSize: "24px",
  fontWeight: 600,
  color: "#1890ff",
};

export default Dashboard;
