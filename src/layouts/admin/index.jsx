import { useState } from "react";
import {
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "customer",
      icon: <UserOutlined />,
      label: "Quản lí người dùng",
      onClick: () => navigate("/admin/customer"),
    },
    {
      key: "furniture",
      icon: <TeamOutlined />,
      label: "Quản lí nội thất",
      onClick: () => navigate("/admin/furniture"),
    },
    {
      key: "booking",
      icon: <FileDoneOutlined />,
      label: "Quản lí đơn hàng",
      onClick: () => navigate("/admin/order"),
    },
    {
      key: "category",
      icon: <AppstoreOutlined />,
      label: "Quản lí danh mục",
      onClick: () => navigate("/admin/category"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          {location.pathname === "/admin/"}
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          DecorNest ©{new Date().getFullYear()} Created by Dev Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
