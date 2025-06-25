import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/features/authSlice";
import {
  Button,
  Input,
  Typography,
  notification,
  Card,
  Space,
  Divider,
  Avatar,
} from "antd";
import { EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Overview = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormData({ fullName: user.fullName || "", email: user.email || "" });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Users/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            fullName: formData.fullName,
            email: formData.email,
            dateCreated: user.dateCreated,
          }),
        }
      );

      if (!res.ok) throw new Error("Cập nhật thất bại");

      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "auth/setUser", payload: updatedUser });

      notification.success({
        message: "Cập nhật thành công",
        description: "Thông tin tài khoản đã được lưu!",
        placement: "topRight",
      });

      setEditMode(false);
    } catch (err) {
      notification.error({
        message: "Lỗi",
        description: err.message,
        placement: "topRight",
      });
    }
  };

  if (!user) return <p>Không có thông tin người dùng.</p>;

  return (
    <div style={{ padding: 40, display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: 500,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <Avatar
          size={96}
          icon={<UserOutlined />}
          src={user.imageBase64 ? `data:image/png;base64,${user.imageBase64}` : null}
          style={{ marginBottom: 20 }}
        />
        <Title level={4}>Thông tin tài khoản</Title>
        <Divider />

        <Space direction="vertical" size="middle" style={{ width: "100%", textAlign: "left" }}>
          <div>
            <Text strong>Họ và tên:</Text>
            {editMode ? (
              <Input name="fullName" value={formData.fullName} onChange={handleChange} />
            ) : (
              <div>{user.fullName || "N/A"}</div>
            )}
          </div>

          <div>
            <Text strong>Email:</Text>
            {editMode ? (
              <Input name="email" value={formData.email} onChange={handleChange} />
            ) : (
              <div>{user.email || "N/A"}</div>
            )}
          </div>

          <div>
            <Text strong>Ngày tạo:</Text>
            <div>{user.dateCreated ? new Date(user.dateCreated).toLocaleDateString("vi-VN") : "N/A"}</div>
          </div>
        </Space>

        <Divider />

        {editMode ? (
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Lưu thay đổi
          </Button>
        ) : (
          <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>
            Chỉnh sửa hồ sơ
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Overview;
