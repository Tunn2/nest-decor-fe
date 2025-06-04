import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Card,
  Typography,
  Divider,
  message,
  Row,
  Col,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styles from "./FurnitureManagement.module.css";

const { Title, Text } = Typography;
const { Option } = Select;

const API_URL = "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Furniture";
const CATEGORY_API = "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Categories";

export default function FurnitureManagement() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const fetchFurniture = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      if (Array.isArray(result.items)) {
        setData(result.items);
      } else {
        setData([]);
      }
    } catch (err) {
      message.error("Không thể tải danh sách nội thất!");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const result = await res.json();
      setCategories(result);
    } catch (err) {
      message.error("Không thể tải danh mục!");
    }
  };

  useEffect(() => {
    fetchFurniture();
    fetchCategories();
  }, []);

  const showAddModal = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      height: record.sizeConfig?.defaultHeight,
      width: record.sizeConfig?.defaultWidth,
      length: record.sizeConfig?.defaultLength,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Đã xóa thành công!");
        fetchFurniture();
      } else {
        throw new Error();
      }
    } catch {
      message.error("Lỗi khi xóa nội thất!");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        sizeConfig: {
          supportsCustomSize: true,
          defaultHeight: parseInt(values.height),
          defaultWidth: parseInt(values.width),
          defaultLength: parseInt(values.length),
          maxHeight: 200,
          maxWidth: 200,
          maxLength: 200,
        },
        categoryId: parseInt(values.categoryId),
      };

      const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success(editingItem ? "Đã cập nhật thành công!" : "Đã thêm mới thành công!");
        setIsModalVisible(false);
        form.resetFields();
        fetchFurniture();
      } else {
        throw new Error();
      }
    } catch {
      message.error("Lỗi khi lưu dữ liệu!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id) => {
        const cat = categories.find((c) => c.id === id);
        return cat ? cat.name : id;
      },
    },
    {
      title: "Kích thước",
      key: "size",
      render: (_, record) => {
        const size = record.sizeConfig;
        return size ? `${size.defaultLength}x${size.defaultWidth}x${size.defaultHeight} cm` : "-";
      },
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Chất liệu",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) =>
        url ? <img src={url} alt="furniture" style={{ width: 60, height: 40, objectFit: "cover" }} /> : "Không có",
    },
    {
      title: "Giá",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (price) => `${price?.toLocaleString("vi-VN")} ₫`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showEditModal(record)} icon={<EditOutlined />}>Sửa</Button>
          <Popconfirm title="Xoá?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Card className={styles.tableCard}>
          <Title level={2}>Quản lý nội thất</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>Thêm mới</Button>
          <Divider />
          <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 10 }} />
        </Card>

        <Modal title={editingItem ? "Sửa nội thất" : "Thêm nội thất"} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="Lưu" cancelText="Hủy">
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Tên" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
              <Select placeholder="Chọn danh mục">
                {categories.map((cat) => <Option key={cat.id} value={cat.id}>{cat.name}</Option>)}
              </Select>
            </Form.Item>
            <Row gutter={8}>
              <Col span={8}><Form.Item name="length" label="Chiều dài (cm)" rules={[{ required: true }]}><Input type="number" min={1} /></Form.Item></Col>
              <Col span={8}><Form.Item name="width" label="Chiều rộng (cm)" rules={[{ required: true }]}><Input type="number" min={1} /></Form.Item></Col>
              <Col span={8}><Form.Item name="height" label="Chiều cao (cm)" rules={[{ required: true }]}><Input type="number" min={1} /></Form.Item></Col>
            </Row>
            <Form.Item name="color" label="Màu sắc" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="material" label="Chất liệu" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="imageUrl" label="Link ảnh" rules={[{ required: true, type: 'url' }]}><Input /></Form.Item>
            <Form.Item name="basePrice" label="Giá (VNĐ)" rules={[{ required: true }]}><Input type="number" min={0} /></Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
