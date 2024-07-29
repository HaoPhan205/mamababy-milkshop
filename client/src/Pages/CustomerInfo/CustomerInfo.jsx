import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Modal } from "antd";
import Cookies from "js-cookie";
import "./CustomerInfo.scss";
import api from "../../config/axios";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const CustomerInfo = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const customerID = Cookies.get("customerId");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get(`/api/customers/${customerID}`);
        const { customerName, email, phone, password } = response.data;
        setCustomerData({ customerName, email, phone, password });
        form.setFieldsValue({
          customerName,
          email,
          phone,
          password,
        });
      } catch (error) {
        message.error("Failed to fetch customer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerID, form]);

  const onFinish = async (values) => {
    try {
      const response = await api.put(`/api/customers/${customerID}`, {
        ...values,
        status: "Yes",
      });

      setCustomerData(response.data);

      form.setFieldsValue({
        ...response.data,
      });

      message.success("Cập nhật thông tin thành công");
      setIsEditing(false);
    } catch (error) {
      message.error("Cập nhật thông tin thất bại");
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="customer-info-container">
      <h1>Thông tin khách hàng</h1>
      <div className="customer-info-details">
        <p>
          <strong>Name:</strong> {customerData.customerName}
        </p>
        <p>
          <strong>Email:</strong> {customerData.email}
        </p>
        <p>
          <strong>Phone:</strong> {customerData.phone}
        </p>
        <p>
          <strong>Password:</strong>{" "}
          {showPassword
            ? customerData.password
            : customerData.password.replace(/./g, "*")}
          <Button
            type="link"
            icon={showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 8 }}
          />
        </p>
        <Button type="primary" onClick={() => setIsEditing(true)}>
          Chỉnh sửa thông tin
        </Button>
      </div>

      <Modal
        title="Edit Customer Information"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="customerName"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              type={showPassword ? "text" : "password"}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              onClick={() => setShowPassword(!showPassword)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerInfo;
