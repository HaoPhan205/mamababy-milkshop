// CompanyManagement.js
import React, { useState, useEffect } from "react";
import {
  Table,
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import api from "../../../config/axios";
import styles from "./CompanyManagement.scss";

const { TabPane } = Tabs;

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const showEditModal = (company) => {
    setEditingCompany(company);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCompany(null);
  };

  const handleSave = async (values) => {
    try {
      if (editingCompany) {
        await api.put(`/api/companies/${editingCompany.companyID}`, values);
        message.success("Company updated successfully");
      } else {
        await api.post("/api/companies", values);
        message.success("Company added successfully");
      }
      fetchCompanies();
      setIsModalVisible(false);
      setEditingCompany(null);
    } catch (error) {
      console.error("Error saving company:", error);
      message.error("Failed to save company");
    }
  };

  const handleDelete = async (companyID) => {
    try {
      await api.delete(`/api/companies/${companyID}`);
      message.success("Company deleted successfully");
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      message.error("Failed to delete company");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "companyID", key: "companyID" },
    { title: "Name", dataIndex: "companyName", key: "companyName" },
    { title: "Country", dataIndex: "countryName", key: "countryName" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this company?"
            onConfirm={() => handleDelete(record.companyID)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" className={styles.antTabs}>
        <TabPane tab="Hoạt động" key="1">
          <Table
            dataSource={companies.filter((company) => company.status === "Yes")}
            columns={columns}
            rowKey="companyID"
            className={styles.antTable}
          />
        </TabPane>
        <TabPane tab="Không hoạt động" key="2">
          <Table
            dataSource={companies.filter((company) => company.status === "No")}
            columns={columns}
            rowKey="companyID"
            className={styles.antTable}
          />
        </TabPane>
      </Tabs>
      <Button type="primary" onClick={() => showEditModal(null)}>
        Add Company
      </Button>
      <Modal
        title={editingCompany ? "Edit Company" : "Add Company"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className={styles.antModal}
      >
        <Form
          initialValues={editingCompany}
          onFinish={handleSave}
          className={styles.antForm}
        >
          <Form.Item
            name="companyName"
            label="Name"
            rules={[
              { required: true, message: "Please input the company name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="countryName"
            label="Country"
            rules={[
              { required: true, message: "Please input the country name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCompany ? "Save" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyManagement;
