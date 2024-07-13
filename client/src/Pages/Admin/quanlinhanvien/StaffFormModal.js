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
      title={
        initialValues
          ? "Chỉnh sửa tài khoản nhân viên"
          : "Tạo tài khoản nhân viên"
      }
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Xác nhận
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="adminID"
          label="Mã nhân viên"
          rules={[{ required: true, message: "Vui lòng nhập mã nhân viên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            { required: true, message: "Vui lòng nhập tài khoản!" },
            { type: "email" },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Chỉ chấp nhận tài khoản Gmail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffFormModal;
