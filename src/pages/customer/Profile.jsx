import React from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LockOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  MessageOutlined,
  DollarCircleOutlined
} from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../redux/features/authSlice";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "overview",
      icon: <UserOutlined style={{ color: "#1677ff" }} />,
      label: <NavLink to="/profile">Overview</NavLink>,
    },
    //{
      //key: "settings",
      //icon: <SettingOutlined style={{ color: "#1677ff" }} />,
      //label: <NavLink to="/profile/settings">Settings</NavLink>,
    //},
    /*{
      key: "security",
      icon: <LockOutlined style={{ color: "#1677ff" }} />,
      label: <NavLink to="/profile/security">Security</NavLink>,
    },*/
    {
      key: "orders",
      icon: <ShoppingOutlined style={{ color: "#1677ff" }} />,
      label: <NavLink to="/profile/orders">Orders</NavLink>,
    },
    {
      key: "payments",
      icon: <DollarCircleOutlined style={{ color: "#1677ff" }} />,
      label: <NavLink to="/profile/payments">Payments</NavLink>,
    },
    {
      key: "chat",
      icon: <MessageOutlined style={{ color: "#1677ff" }} />,
      label: <NavLink to="/profile/chat">Chat</NavLink>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#faad14" }} />,
      label: (
        <span onClick={handleLogout} style={{ fontWeight: "bold", color: "#faad14" }}>
          Logout
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={260}
        style={{
          background: "linear-gradient(180deg, #f5f7fa 0%, #e9eff5 100%)",
          padding: "24px 16px",
          borderRight: "1px solid #dce3ea",
          boxShadow: "2px 0 5px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#e6f4ff",
              border: "2px solid #91caff",
            }}
          />
          <Title level={4} style={{ marginTop: 12 }}>{user?.fullName || "User Name"}</Title>
          <Text type="secondary">{user?.email || "user@example.com"}</Text>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["overview"]}
          style={{
            border: "none",
            backgroundColor: "transparent",
          }}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ padding: "40px" }}>
        <Content
          style={{
            padding: 24,
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
