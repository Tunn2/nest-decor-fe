import { useEffect, useState } from "react"
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Card,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Statistic,
  Tag,
  Empty,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  ReloadOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import styles from "./CategoryManagement.module.css"

const { Title, Text, Paragraph } = Typography
const API_URL = "https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Categories"

export default function CategoryManagement() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [form] = Form.useForm()

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setCategories(data)
      message.success("Tải danh mục thành công!")
    } catch (err) {
      message.error("Lỗi khi tải danh mục!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = () => {
    setEditingCategory(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingCategory(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      message.success("Xoá danh mục thành công!")
      fetchCategories()
    } catch (err) {
      message.error("Lỗi khi xoá danh mục!")
    } finally {
      setLoading(false)
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      if (editingCategory) {
        await fetch(`${API_URL}/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editingCategory, ...values }),
        })
        message.success("Cập nhật danh mục thành công!")
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        message.success("Thêm danh mục thành công!")
      }
      setModalVisible(false)
      fetchCategories()
    } catch (err) {
      message.error("Lỗi khi lưu danh mục!")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase()) ||
      category.description.toLowerCase().includes(searchText.toLowerCase()),
  )

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id) => <Tag color="#108ee9">{id}</Tag>,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text) => (
        <Space>
          <AppstoreOutlined style={{ color: "#1677ff" }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 300,
      ellipsis: true,
      render: (text) => <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "Xem thêm" }}>{text}</Paragraph>,
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            ghost
            onClick={() => handleEdit(record)}
            className={styles.buttonEdit}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa danh mục"
            description={`Bạn chắc chắn muốn xóa danh mục "${record.name}"?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="middle" className={styles.buttonDelete}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <Card className={styles.tableCard}>
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={2} style={{ margin: 0, color: "#1677ff", display: "flex", alignItems: "center" }}>
                <AppstoreOutlined style={{ marginRight: "12px" }} />
                Quản lý danh mục
              </Title>
              <Text type="secondary">Quản lý và tổ chức các danh mục trong hệ thống</Text>
            </Col>
            <Col>
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchCategories}
                  loading={loading}
                  className={styles.buttonReload}
                >
                  Làm mới
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                  className={styles.buttonAdd}
                >
                  Thêm danh mục
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]} style={{ margin: "24px 0" }}>
          <Col xs={24} sm={8}>
            <Card className={styles.statCard} bodyStyle={{ padding: "24px" }}>
              <Statistic
                title={<Text style={{ color: "white", opacity: 0.9 }}>Tổng số danh mục</Text>}
                value={categories.length}
                valueStyle={{ color: "white", fontSize: "32px", fontWeight: "bold" }}
                prefix={<AppstoreOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={16}>
            <Card className={styles.searchCard} bodyStyle={{ padding: "24px" }}>
              <Input
                placeholder="Tìm kiếm danh mục..."
                prefix={<SearchOutlined style={{ color: "#1677ff" }} />}
                value={searchText}
                onChange={handleSearch}
                allowClear
                size="large"
                className={styles.inputLarge}
              />
            </Card>
          </Col>
        </Row>

        <Card className={styles.tableCard} bodyStyle={{ padding: "24px" }}>
          <Table
            dataSource={filteredCategories}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 8,
              showSizeChanger: true,
              showTotal: (total) => `Tổng cộng ${total} danh mục`,
              showQuickJumper: true,
              style: { marginTop: "16px" },
            }}
            locale={{
              emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />,
            }}
          />
        </Card>

        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              {editingCategory ? (
                <EditOutlined style={{ marginRight: "8px", color: "#1677ff" }} />
              ) : (
                <PlusOutlined style={{ marginRight: "8px", color: "#1677ff" }} />
              )}
              <span>{editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}</span>
            </div>
          }
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          confirmLoading={loading}
          okText={editingCategory ? "Cập nhật" : "Thêm mới"}
          cancelText="Huỷ"
          destroyOnClose
          width={600}
          style={{ top: 20 }}
          okButtonProps={{
            className: editingCategory ? styles.modalUpdateButton : styles.modalOkButton,
          }}
          cancelButtonProps={{
            className: styles.modalCancelButton,
          }}
        >
          <Divider />
          <Form form={form} layout="vertical" preserve={false}>
            <Form.Item
              name="name"
              label={<Text strong>Tên danh mục</Text>}
              rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
              tooltip={{ title: "Tên danh mục sẽ hiển thị trong hệ thống", icon: <InfoCircleOutlined /> }}
            >
              <Input
                placeholder="Nhập tên danh mục"
                prefix={<AppstoreOutlined style={{ color: "#bfbfbf" }} />}
                size="large"
                className={styles.inputLarge}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={<Text strong>Mô tả</Text>}
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              tooltip={{ title: "Mô tả chi tiết về danh mục", icon: <InfoCircleOutlined /> }}
            >
              <Input.TextArea
                placeholder="Nhập mô tả chi tiết về danh mục"
                rows={4}
                showCount
                maxLength={500}
                className={styles.textarea}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}
