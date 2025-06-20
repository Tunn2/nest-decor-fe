import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Spin } from "antd";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Admin/dashboard")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin tip="Loading dashboard..." />;

  return (
    <Row gutter={24}>
      <Col span={6}><Card><Statistic title="Total Users" value={data.totalUsers} /></Card></Col>
      <Col span={6}><Card><Statistic title="Total Orders" value={data.totalOrders} /></Card></Col>
      <Col span={6}><Card><Statistic title="Total Revenue" value={data.totalRevenue} suffix="₫" /></Card></Col>
      <Col span={6}><Card><Statistic title="Total Products" value={data.totalProducts} /></Card></Col>
    </Row>
  );
};

export default Dashboard;
