import React, { useState } from "react";
import { Input, Button, List, Typography, Space, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newLog = [...chatLog, { type: "user", text: message }];
    setChatLog(newLog);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/ChatBot/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();
      const botReply = data?.message || "No response from server";

      setChatLog([...newLog, { type: "bot", text: botReply }]);
    } catch (error) {
      console.error("Fetch error:", error);
      setChatLog([...newLog, { type: "bot", text: "Error connecting to chatbot." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <List
        bordered
        dataSource={chatLog}
        renderItem={(item) => (
          <List.Item style={{ backgroundColor: item.type === "user" ? "#e6f4ff" : "#f9f9f9" }}>
            <Space direction="vertical">
              <Text strong>{item.type === "user" ? "You" : "Bot"}</Text>
              <Text>{item.text}</Text>
            </Space>
          </List.Item>
        )}
        style={{ marginBottom: 16, maxHeight: "50vh", overflowY: "auto" }}
      />

      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Type your message..."
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend} loading={loading}>
          Send
        </Button>
      </Space.Compact>

      {loading && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Spin tip="Waiting for response..." />
        </div>
      )}
    </div>
  );
};

export default Chat;
