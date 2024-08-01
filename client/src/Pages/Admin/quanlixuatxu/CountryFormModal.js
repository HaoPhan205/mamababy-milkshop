import React from "react";
import { Modal, Form, Input } from "antd";

const CountryFormModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? "Chỉnh sửa xuất xứ" : "Thêm xuất xứ"}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item
          name="countryId"
          label="Mã quốc gia"
          rules={[{ required: true, message: "Please input the country ID!" }]}
        >
          <Input disabled={!!initialValues} />
        </Form.Item>
        <Form.Item
          name="countryName"
          label="Tên quốc gia"
          rules={[
            { required: true, message: "Please input the country name!" },
          ]}
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
      </Form>
    </Modal>
  );
};

export default CountryFormModal;
