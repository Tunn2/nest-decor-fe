import { useState } from "react";
import {
  TeamOutlined,
  UserOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  DashboardOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

const { Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathKey = location.pathname.split("/")[2] || "home";

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      onClick: () => navigate("/"),
    },
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Thống kê",
      onClick: () => navigate("/admin/dashboard"),
    },
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
      key: "top-selling",
      icon: <BarChartOutlined />,
      label: "Sản phẩm bán chạy",
      onClick: () => navigate("/admin/top-selling"),
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
        theme="dark"
        width={230}
        style={{
          background: "#001529",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 8,
            textAlign: "center",
            fontSize: 18,
            color: "#fff",
            fontWeight: 600,
            lineHeight: "64px",
            letterSpacing: 1,
          }}
        >
          Admin
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathKey]}
          items={menuItems}
          style={{ flex: 1, borderRight: 0 }}
        />

        <div
          style={{
            borderTop: "1px solid #2f3e55",
            padding: "12px 16px",
            background: "#001529",
          }}
        >
          <Menu theme="dark" mode="inline" selectedKeys={[]}>
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              danger
              onClick={handleLogout}
              style={{ fontWeight: 500 }}
            >
              Đăng xuất
            </Menu.Item>
          </Menu>
        </div>
      </Sider>

      <Layout>
        <Content
          style={{
            margin: 16,
            padding: 24,
            background: colorBgContainer,
            borderRadius: 10,
            minHeight: 360,
          }}
        >
          <Outlet />
        </Content>

        <Footer
          style={{
            textAlign: "center",
            color: "#aaa",
            fontSize: 13,
            padding: 16,
            background: "#f5f5f5",
            borderTop: "1px solid #e8e8e8",
          }}
        >
          © {new Date().getFullYear()} DecorNest. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
