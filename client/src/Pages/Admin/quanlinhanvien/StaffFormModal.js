import React, { useEffect } from "react";
import { Form, Input, Modal, Button, Select } from "antd";

const { Option } = Select;

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
        onClose();
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
      open={visible}
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
          rules={[{ required: true, message: "Bạn chưa nhập mã nhân viên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            { required: true, message: "Bạn chưa nhập tài khoản nhân viên!" },

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
            { required: true, message: "Bạn chưa nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: "Bạn chưa chọn vai trò" }]}
        >
          <Select>
            <Option value="Admin">Admin</Option>
            <Option value="Staff">Staff</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StaffFormModal;
