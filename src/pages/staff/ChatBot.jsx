import { useState } from "react";
import { Input, Button, List, Typography, Card } from "antd";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = { sender: "staff", content: message };
    setMessages([...messages, newMessage]);

    // Giả lập phản hồi từ bot
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", content: "Bot đã nhận: " + message }]);
    }, 500);

    setMessage("");
  };

  return (
    <Card title="Hỗ trợ khách hàng" style={{ height: "100%", minHeight: 400 }}>
      <List
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text strong>{item.sender === "staff" ? "Bạn: " : "Bot: "}</Typography.Text> {item.content}
          </List.Item>
        )}
        style={{ maxHeight: 300, overflowY: "auto", marginBottom: 16 }}
      />
      <Input.Group compact>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Nhập nội dung..."
          style={{ width: "calc(100% - 100px)" }}
        />
        <Button type="primary" onClick={handleSend}>
          Gửi
        </Button>
      </Input.Group>
    </Card>
  );
};

export default ChatBot;
