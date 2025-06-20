import React, { useEffect, useState } from "react";
import { List, Typography, Spin, Empty } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/authSlice";

const { Text, Title } = Typography;

const PaymentHistory = () => {
  const user = useSelector(selectUser);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) return;
      setLoading(true);

      try {
        const response = await fetch(
          `https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Payment/history/${user.id}`
        );

        const data = await response.json();
        setHistory(data || []);
      } catch (error) {
        console.error("Failed to fetch payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Payment History</Title>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin tip="Loading payment history..." />
        </div>
      ) : history.length === 0 ? (
        <Empty description="No payment history found." style={{ marginTop: 40 }} />
      ) : (
        <List
          bordered
          dataSource={history}
          renderItem={(item, index) => (
            <List.Item>
              <div>
                <Text strong>#{index + 1}</Text>
                <br />
                <Text>Date: {item.date || "N/A"}</Text>
                <br />
                <Text>Amount: {item.amount || "0"} VND</Text>
                <br />
                <Text>Status: {item.status || "Unknown"}</Text>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default PaymentHistory;
