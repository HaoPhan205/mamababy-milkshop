import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const StaffFormModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Modal
      title={initialValues ? "Edit Staff" : "Add Staff"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="adminID"
          label="Mã nhân viên"
          rules={[{ required: true, message: "Please enter the admin ID" }]}
        >
          <Input disabled={!!initialValues} autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tài khoản nhân viên"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffFormModal;
