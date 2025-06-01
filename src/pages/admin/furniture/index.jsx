"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  TableOutlined,
  BgColorsOutlined,
  ColumnWidthOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;
const { Meta } = Card;

const typeColors = {
  Ghế: "#1890ff",
  Bàn: "#52c41a",
  Tủ: "#722ed1",
  Giường: "#fa8c16",
  Khác: "#d9d9d9",
};

export default function FurnitureManagement() {
  const [data, setData] = useState([
    {
      key: 1,
      name: "Ghế Sofa",
      type: "Ghế",
      size: "2m x 0.8m x 0.7m",
      color: "Xám",
      material: "Vải",
      image: "https://cdn.noithatplus.com/wp-content/uploads/2021/12/ghe-sofa-phong-khach.jpg",
      price: 3500000,
    },
    {
      key: 2,
      name: "Bàn Trà",
      type: "Bàn",
      size: "1m x 0.5m x 0.4m",
      color: "Nâu",
      material: "Gỗ",
      image: "https://noithatbinhminh.com.vn/wp-content/uploads/2020/09/ban-tra-go-tu-nhien.jpg",
      price: 1200000,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const showAddModal = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        setData(
          data.map((item) =>
            item.key === editingItem.key ? { ...item, ...values } : item
          )
        );
      } else {
        setData([...data, { key: Date.now(), ...values }]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const getStatsData = () => {
    const total = data.length;
    const chairs = data.filter((item) => item.type === "Ghế").length;
    const tables = data.filter((item) => item.type === "Bàn").length;
    const others = data.filter(
      (item) => !["Ghế", "Bàn"].includes(item.type)
    ).length;

    return { total, chairs, tables, others };
  };

  const stats = getStatsData();

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 80,
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <HomeOutlined style={{ color: "#1890ff" }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          color={typeColors[type]}
          style={{ fontWeight: "bold", borderRadius: "6px" }}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      render: (text) => (
        <Space>
          <ColumnWidthOutlined style={{ color: "#52c41a" }} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      render: (text) => (
        <Space>
          <BgColorsOutlined style={{ color: "#fa8c16" }} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Chất liệu",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="furniture"
            style={{
              width: 60,
              height: 40,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        ) : (
          <span style={{ color: "#aaa" }}>Không có</span>
        ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text strong style={{ color: "#fa541c" }}>
          {price?.toLocaleString("vi-VN")} ₫
        </Text>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description={`Bạn chắc chắn muốn xóa "${record.name}"?`}
            onConfirm={() => handleDelete(record.key)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0, color: "#1f2937" }}>
              <AppstoreOutlined
                style={{ marginRight: "12px", color: "#1890ff" }}
              />
              Quản lý đồ nội thất
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Quản lý và theo dõi các món đồ nội thất trong hệ thống
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={showAddModal}
            style={{
              height: "48px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Thêm mới
          </Button>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    background: "#e6f7ff",
                    padding: "12px",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                >
                  <AppstoreOutlined
                    style={{ fontSize: "24px", color: "#1890ff" }}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    Tổng số món
                  </Text>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    {stats.total}
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    background: "#f6ffed",
                    padding: "12px",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                >
                  <HomeOutlined
                    style={{ fontSize: "24px", color: "#52c41a" }}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    Ghế
                  </Text>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    {stats.chairs}
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    background: "#f9f0ff",
                    padding: "12px",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                >
                  <TableOutlined
                    style={{ fontSize: "24px", color: "#722ed1" }}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    Bàn
                  </Text>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    {stats.tables}
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    background: "#fff7e6",
                    padding: "12px",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                >
                  <AppstoreOutlined
                    style={{ fontSize: "24px", color: "#fa8c16" }}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    Khác
                  </Text>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    {stats.others}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Table */}
        <Card
          title={
            <div>
              <Title level={4} style={{ margin: 0 }}>
                <TableOutlined
                  style={{ marginRight: "8px", color: "#1890ff" }}
                />
                Danh sách đồ nội thất
              </Title>
              <Text type="secondary">
                Quản lý thông tin chi tiết về các món đồ nội thất
              </Text>
            </div>
          }
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} món đồ`,
            }}
            style={{
              background: "white",
              borderRadius: "8px",
            }}
            rowClassName={() => "hover:bg-gray-50"}
          />
        </Card>

        {/* Modal */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <AppstoreOutlined
                style={{ marginRight: "8px", color: "#1890ff" }}
              />
              <span>
                {editingItem ? "Sửa đồ nội thất" : "Thêm đồ nội thất"}
              </span>
            </div>
          }
          open={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText={editingItem ? "Cập nhật" : "Thêm mới"}
          cancelText="Hủy"
          width={600}
          style={{ top: 20 }}
          okButtonProps={{
            size: "large",
            style: { fontWeight: "bold" },
          }}
          cancelButtonProps={{
            size: "large",
          }}
        >
          <Divider style={{ margin: "16px 0" }} />
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: "24px" }}
          >
            {editingItem
              ? "Cập nhật thông tin đồ nội thất"
              : "Thêm món đồ nội thất mới vào hệ thống"}
          </Text>

          <Form form={form} layout="vertical" style={{ marginTop: "16px" }}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label={<Text strong>Tên đồ nội thất</Text>}
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input
                    size="large"
                    placeholder="Nhập tên đồ nội thất"
                    prefix={<HomeOutlined style={{ color: "#bfbfbf" }} />}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="type"
                  label={<Text strong>Loại</Text>}
                  rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
                >
                  <Select size="large" placeholder="Chọn loại đồ nội thất">
                    <Option value="Ghế">
                      <Space>
                        <HomeOutlined />
                        Ghế
                      </Space>
                    </Option>
                    <Option value="Bàn">
                      <Space>
                        <TableOutlined />
                        Bàn
                      </Space>
                    </Option>
                    <Option value="Tủ">
                      <Space>
                        <AppstoreOutlined />
                        Tủ
                      </Space>
                    </Option>
                    <Option value="Giường">
                      <Space>
                        <HomeOutlined />
                        Giường
                      </Space>
                    </Option>
                    <Option value="Khác">
                      <Space>
                        <AppstoreOutlined />
                        Khác
                      </Space>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="size"
                  label={<Text strong>Kích thước</Text>}
                  rules={[
                    { required: true, message: "Vui lòng nhập kích thước!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="VD: 2m x 0.8m x 0.7m"
                    prefix={
                      <ColumnWidthOutlined style={{ color: "#bfbfbf" }} />
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="color"
                  label={<Text strong>Màu sắc</Text>}
                  rules={[
                    { required: true, message: "Vui lòng nhập màu sắc!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Nhập màu sắc"
                    prefix={<BgColorsOutlined style={{ color: "#bfbfbf" }} />}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="material"
                  label={<Text strong>Chất liệu</Text>}
                  rules={[
                    { required: true, message: "Vui lòng nhập chất liệu!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Nhập chất liệu"
                    prefix={<AppstoreOutlined style={{ color: "#bfbfbf" }} />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="image"
                  label={<Text strong>Hình ảnh (URL)</Text>}
                  rules={[
                    { required: true, message: "Vui lòng nhập link hình ảnh!" },
                    { type: "url", message: "Link không hợp lệ!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Dán link hình ảnh"
                    prefix={<AppstoreOutlined style={{ color: "#bfbfbf" }} />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label={<Text strong>Giá (VNĐ)</Text>}
                  rules={[
                    { required: true, message: "Vui lòng nhập giá!" },
                    { pattern: /^\d+$/, message: "Chỉ nhập số!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Nhập giá"
                    prefix={<Text strong>₫</Text>}
                    type="number"
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
