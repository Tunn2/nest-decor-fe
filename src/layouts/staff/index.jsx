import { useState } from "react";
import {
  MessageOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

const { Content, Footer, Sider } = Layout;

const LayoutStaff = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathKey = location.pathname.split("/")[2] || "chat";

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
      key: "chat",
      icon: <MessageOutlined />,
      label: "Chat",
      onClick: () => navigate("/staff/chat"),
    },
    {
      key: "order",
      icon: <FileDoneOutlined />,
      label: "Quản lý đơn hàng",
      onClick: () => navigate("/staff/order"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
      >
        <div
          style={{
            height: 64,
            margin: "16px",
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            lineHeight: "32px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 8,
            paddingTop: 16,
          }}
        >
          Staff
        </div>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathKey]}
          items={menuItems}
        />

        <Menu
          theme="dark"
          mode="inline"
          style={{ marginTop: "auto", borderTop: "1px solid #444" }}
        >
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: colorBgContainer,
            borderRadius: "8px",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center", color: "#888", fontSize: 14 }}>
          © {new Date().getFullYear()} DecorNest. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutStaff;
