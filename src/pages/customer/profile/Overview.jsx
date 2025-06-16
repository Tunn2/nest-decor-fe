import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../redux/features/authSlice";
import { Avatar, Typography, Divider, Progress, Button, Space } from "antd";

const { Title, Text } = Typography;

const Overview = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const fullName = user?.fullName || "N/A";
  const email = user?.email || "N/A";
  const role = user?.roleName || "Customer";
  const status = user?.isActive === false ? "Inactive" : "Active";
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "June 2025";

  const profileCompletion = user?.avatar ? 100 : 80;

  const handleEditProfile = () => {
    navigate("/profile/settings");
  };

  return (
    <div className="profileCard">
      <div className="profileHeader">
        <Avatar
          size={96}
          style={{
            backgroundColor: "#e6f4ff",
            color: "#1677ff",
            fontSize: 32,
            marginBottom: 16,
          }}
        >
          {fullName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Title level={3}>{fullName}</Title>
        <Text type="secondary">{email}</Text>
      </div>

      <Divider />

      <div className="profileInfo">
        <div className="profileRow">
          <span className="label">Account Type:</span>
          <span className="value">{role}</span>
        </div>

        <div className="profileRow">
          <span className="label">Status:</span>
          <span className="value">{status}</span>
        </div>

        <div className="profileRow">
          <span className="label">Member Since:</span>
          <span className="value">{createdAt}</span>
        </div>
      </div>

      <Divider />

      <div style={{ marginTop: 24 }}>
        <Text strong>Profile Completion</Text>
        <Progress
          percent={profileCompletion}
          status={profileCompletion < 100 ? "active" : "success"}
          strokeColor={{
            from: "#108ee9",
            to: "#87d068",
          }}
        />
      </div>

      <Divider />

      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={handleEditProfile}>
          Chỉnh sửa hồ sơ
        </Button>
      </Space>
    </div>
  );
};

export default Overview;
