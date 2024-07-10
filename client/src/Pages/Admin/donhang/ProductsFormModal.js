import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const ProductsFormModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? "Edit Product" : "Add Product"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="productItemId"
          label="Mã đơn hàng"
          rules={[{ required: true, message: "Please input the product ID!" }]}
        >
          <Input disabled={!!initialValues} />
        </Form.Item>
        <Form.Item
          name="itemName"
          label="Tên đơn hàng"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="stockQuantity"
          label="Lượng hàng"
          rules={[
            { required: true, message: "Please input the stock quantity!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="soldQuantity"
          label="Đã bán"
          rules={[
            { required: true, message: "Please input the sold quantity!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="benefit"
          label="Benefit"
          rules={[{ required: true, message: "Please input the benefit!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="image1"
          label="Image 1"
          rules={[
            { required: true, message: "Please input the first image URL!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image2"
          label="Image 2"
          rules={[
            { required: true, message: "Please input the second image URL!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image3"
          label="Image 3"
          rules={[
            { required: true, message: "Please input the third image URL!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductsFormModal;
