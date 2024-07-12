import React, { useEffect } from "react";
import { Form, Input, Modal, Button } from "antd";

const StaffFormModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={initialValues ? "Edit Staff" : "Add Staff"}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="adminID"
          label="Mã nhân viên"
          rules={[{ required: true, message: "Please input the staff ID!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            { required: true, message: "Please input the username!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Please input the password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffFormModal;
