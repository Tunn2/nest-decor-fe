import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "furnitureName", key: "furnitureName" },
    { title: "Số lượng đã bán", dataIndex: "totalSold", key: "totalSold" },
    { title: "Doanh thu", dataIndex: "revenueGenerated", key: "revenueGenerated", render: (v) => `${v.toLocaleString()} ₫` },
  ];

  useEffect(() => {
    fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Admin/top-selling")
      .then((res) => res.json())
      .then((res) => setProducts(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin tip="Loading top-selling products..." />;

  return <Table rowKey="furnitureId" columns={columns} dataSource={products} />;
};

export default TopSelling;
