import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import api from "../../../config/axios";

const { Option } = Select;

const ProductsFormModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const [brandMilks, setBrandMilks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchBrandMilks();
    fetchCompanies();
    fetchCountries();
  }, []);

  const fetchBrandMilks = async () => {
    try {
      const response = await api.get("/api/brandmilks");
      setBrandMilks(response.data); // Assuming API returns an array of brand milks
    } catch (error) {
      console.error("Failed to fetch brand milks:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data); // Assuming API returns an array of companies
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get("/api/countries");
      setCountries(response.data); // Assuming API returns an array of countries
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

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
          rules={[{ required: true, message: "Bạn chưa nhập mã đơn hàng" }]}
        >
          <Input disabled={!!initialValues} />
        </Form.Item>

        <Form.Item
          name="itemName"
          label="Tên đơn hàng"
          rules={[{ required: true, message: "Bạn chưa nhập tên đơn hàng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Khuyến mãi"
          rules={[{ required: true, message: "Bạn chưa nhập khuyến mãi" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="stockQuantity"
          label="Lượng hàng trong kho"
          rules={[
            { required: true, message: "Bạn chưa nhập lượng hàng trong kho" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="brandMilkId"
          label="Thương hiệu sữa"
          rules={[{ required: true, message: "Bạn chưa nhập thương hiệu sữa" }]}
        >
          <Select>
            {brandMilks.map((brand) => (
              <Option key={brand.brandMilkID} value={brand.brandName}>
                {brand.brandName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="benefit"
          label="Lợi ích"
          rules={[{ required: true, message: "Bạn chưa nhập lợi ích" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Bạn chưa nhập mô tả" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="brandMilkID"
          label="Mã thương hiệu sữa"
          rules={[{ required: true, message: "Bạn chưa nhập thương hiệu sữa" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="countryName"
          label="Xuất xứ"
          rules={[{ required: true, message: "Bạn chưa nhập nơi xuất xứ" }]}
        >
          <Select>
            {countries.map((country) => (
              <Option key={country.companyID} value={country.countryName}>
                {country.countryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="mama"
          label="Dành cho mẹ bầu"
          // rules={[{ required: true, message: "Bạn chưa nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="baby"
          label="Dành cho em bé"
          // rules={[{ required: true, message: "Bạn chưa nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weight"
          label="khối lượng"
          rules={[{ required: true, message: "Bạn chưa nhập công ty" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="companyName"
          label="Công ty"
          rules={[{ required: true, message: "Bạn chưa nhập công ty" }]}
        >
          <Select>
            {companies.map((company) => (
              <Option key={company.companyID} value={company.companyName}>
                {company.companyName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="image1"
          label="Hình ảnh 1"
          rules={[{ required: true, message: "Bạn chưa nhập URL hình ảnh 1" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image2"
          label="Hình ảnh 2"
          rules={[{ required: true, message: "Bạn chưa nhập URL hình ảnh 2" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image3"
          label="Hình ảnh 3"
          rules={[{ required: true, message: "Bạn chưa nhập URL hình ảnh 3" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductsFormModal;
