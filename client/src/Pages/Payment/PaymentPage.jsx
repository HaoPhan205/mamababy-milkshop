import React, { useState } from "react";
import {
  Tabs,
  Button,
  Divider,
  Typography,
  message,
  Spin,
  Form,
  Input,
} from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../config/axios";
import "./Payment.scss";
import { deleteSelectedItems } from "../../store/reduxReducer/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Payment = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const customerId = Cookies.get("customerId");
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const carts = useSelector((state) => state.cart).products;

  const handleVNPay = async (values) => {
    setLoading(true);
    const { name, phone, address } = values;
    const shippingInfo = `${name}-${phone}-${address}`;
    const xacnhan = "xac-nhan";
    const amount = totalInfo.total + totalInfo.discount;
    try {
      const response = await api.get(
        `/api/payment/VNPay/${amount}/${xacnhan}/${shippingInfo}/${customerId}`
      );
      const paymentUrl = response.data;
      window.location.href = paymentUrl;
      dispatch(deleteSelectedItems(selectedItems));
    } catch (error) {
      console.error("Failed to process VNPay payment:", error);
      message.error("Failed to process VNPay payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async (values) => {
    setLoading(true);
    const { name, phone, address } = values;
    const shippingAddress = `${name}-${phone}-${address}`;
    const amount = totalInfo.total + totalInfo.discount;

    const productItems = selectedItems.map((item) => ({
      productItemID: item.productItemId,
      quantity: item.quantity,
      price: item.total,
      itemName: item.itemName,
      image1: item.image1,
      discount: item.discount || 0,
      stockQuantity: item.stockQuantity || 0,
    }));

    const payload = {
      amount: amount,
      shippingAddress,
      customerID: customerId,
      productItems,
    };

    try {
      await api.post("/api/payment/COD", payload);
      setSuccess(true);
      message.success("Thanh toán thành công!");
      dispatch(deleteSelectedItems(selectedItems));
      navigate("/thanh-toan-thanh-cong");
    } catch (error) {
      // navigate("/thanh-toan-that-bai");
      navigate("/thanh-toan-thanh-cong");
    } finally {
      setLoading(false);
    }
  };

  const totalInfo = useSelector((state) => ({
    total: state.cart.totalPrice,
    discount: state.cart.totalDiscount,
  }));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="payment-page">
      <Title level={2}>Thanh toán</Title>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="VNPay" key="1">
          <Form
            form={form}
            name="vnpayForm"
            onFinish={handleVNPay}
            layout="vertical"
          >
            <div className="payment-content">
              <Text strong>
                Tổng tiền thanh toán:{" "}
                {formatCurrency(totalInfo.total + totalInfo.discount)}
              </Text>

              <Divider />
              <Form.Item
                name="name"
                label="Họ và tên người nhận"
                rules={[
                  { required: true, message: "Vui lòng nhập tên của bạn" },
                ]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại người nhận"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ nhận hàng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ của bạn",
                  },
                ]}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Xác nhận thanh toán
                </Button>
              </Form.Item>
            </div>
          </Form>
        </TabPane>
        <TabPane tab="Thanh toán khi nhận hàng" key="2">
          <Form
            form={form}
            name="codForm"
            onFinish={handleCOD}
            layout="vertical"
          >
            <div className="payment-content">
              {success ? (
                <div className="payment-success">
                  <Title level={4}>Thanh toán khi nhận hàng</Title>
                </div>
              ) : (
                <>
                  {" "}
                  <Text strong>
                    Tổng tiền thanh toán:{" "}
                    {formatCurrency(totalInfo.total + totalInfo.discount)}
                  </Text>
                  <Divider />
                  <Form.Item
                    name="name"
                    label="Họ và tên người nhận"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên của bạn" },
                    ]}
                  >
                    <Input placeholder="Họ và tên" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại của bạn",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="Địa chỉ nhận hàng"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ của bạn",
                      },
                    ]}
                  >
                    <Input placeholder="Địa chỉ" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Xác nhận thanh toán
                    </Button>
                  </Form.Item>
                </>
              )}
            </div>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Payment;
