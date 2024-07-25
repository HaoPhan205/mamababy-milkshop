import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import api from "../../../config/axios";
import "./thuonghieu.scss";
const { Option } = Select;

const BrandMilksPage = () => {
  const [brandMilks, setBrandMilks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBrandMilks();
    fetchCompanies();
  }, []);

  const fetchBrandMilks = async () => {
    try {
      const response = await api.get("/api/brandmilks");
      setBrandMilks(response.data);
    } catch (error) {
      console.error("Failed to fetch brand milks:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsEditing(true);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (brandMilkID) => {
    try {
      await api.delete(`/api/brandmilks/${brandMilkID}`);
      message.success("Deleted successfully");
      fetchBrandMilks();
    } catch (error) {
      console.error("Failed to delete brand milk:", error);
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (isEditing) {
          await api.put(`/api/brandmilks/${editingRecord.brandMilkID}`, values);
          message.success("Updated successfully");
        } else {
          await api.post("/api/brandmilks", values);
          message.success("Added successfully");
        }
        fetchBrandMilks();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const columns = [
    { title: "ID", dataIndex: "brandMilkID", key: "brandMilkID" },
    { title: "Brand Name", dataIndex: "brandName", key: "brandName" },
    { title: "Company ID", dataIndex: "companyID", key: "companyID" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.brandMilkID)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        Add Brand Milk
      </Button>
      <Table columns={columns} dataSource={brandMilks} rowKey="brandMilkID" />

      <Modal
        title={isEditing ? "Edit Brand Milk" : "Add Brand Milk"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="brandMilkID"
            label="Brand Milk ID"
            rules={[
              { required: true, message: "Please input the Brand Milk ID!" },
            ]}
          >
            <Input disabled={isEditing} />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the Brand Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="companyID"
            label="Company ID"
            rules={[{ required: true, message: "Please select a Company!" }]}
          >
            <Select>
              {companies.map((company) => (
                <Option key={company.companyID} value={company.companyID}>
                  {company.companyName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandMilksPage;
