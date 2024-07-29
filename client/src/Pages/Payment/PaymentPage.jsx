import React, { useState } from "react";
import { Button, Divider, Typography, message, Form, Input, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../config/axios";
import "./Payment.scss";
import { deleteSelectedItems } from "../../store/reduxReducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

const Payment = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const customerId = Cookies.get("customerId");
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const carts = useSelector((state) => state.cart).products;
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const totalInfo = useSelector((state) => ({
    total: state.cart.totalPrice,
    discount: state.cart.totalDiscount,
  }));

  const filteredSelectedItems = carts.filter((item) =>
    selectedItems.includes(item.productItemId)
  );

  const handleVNPayPayment = async (values) => {
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

  const handleCODPayment = async (values) => {
    setLoading(true);
    const { name, phone, address } = values;
    const shippingAddress = `${name} - ${phone} - ${address}`;
    const amount = totalInfo.total + totalInfo.discount;

    const productItems = filteredSelectedItems.map((item) => ({
      productItemID: item.productItemId,
      quantity: item.quantity,
    }));

    const payload = {
      amount: amount,
      shippingAddress,
      customerID: customerId,
      productItems: productItems,
    };

    try {
      await api.post("/api/payment/COD", payload);
      message.success("Thanh toán thành công!");
      dispatch(deleteSelectedItems(selectedItems));
      navigate("/thanh-toan-thanh-cong");
    } catch (error) {
      console.error("Failed to process COD payment:", error);
      message.error("Failed to process COD payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.warning("Bạn chưa có sản phẩm cần thanh toán.");
      return;
    }

    form
      .validateFields()
      .then((values) => {
        const token = Cookies.get("token");

        if (token) {
          if (values.paymentMethod === "VNPAY") {
            handleVNPayPayment(values);
          } else {
            handleCODPayment(values);
          }
        } else {
          message.warning("Bạn cần đăng nhập để thanh toán.");
          navigate("/sign-in");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const onPaymentMethodChange = (e) => {
    setPaymentMethodSelected(!!e.target.value);
    // console.log(selectedItems);
    console.log(filteredSelectedItems);
    // console.log(totalInfo.total);
    // console.log(totalInfo.discount);
    // console.log(totalInfo.total + totalInfo.discount);
  };

  return (
    <div className="payment-container">
      <Title className="payment-title" level={2}>
        Thông tin thanh toán
      </Title>
      <Divider />
      <div className="payment-content">
        <div className="payment-info">
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Tên người nhận"
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận" },
              ]}
            >
              <Input placeholder="Tên người nhận" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
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
                  message: "Vui lòng nhập địa chỉ nhận hàng",
                },
              ]}
            >
              <Input placeholder="Địa chỉ nhận hàng" />
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Phương thức thanh toán"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Radio.Group onChange={onPaymentMethodChange}>
                <Radio value="VNPAY">VNPay</Radio>
                <Radio value="COD">Thanh toán khi nhận hàng</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
        <div className="payment-summary">
          <div className="summary-item">
            <Text>Tính tạm</Text>
            <Text>{formatCurrency(totalInfo.total)}</Text>
          </div>
          <div className="summary-item">
            <Text>Giảm giá sản phẩm</Text>
            <Text className="summary-discount">
              {formatCurrency(totalInfo.discount)}
            </Text>
          </div>
          <Divider />
          <div className="summary-item summary-total">
            <Text strong>Tổng tiền</Text>
            <Text strong>
              {formatCurrency(totalInfo.total + totalInfo.discount)}
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <Button
        type="primary"
        className="payment-checkout"
        onClick={handleCheckout}
        loading={loading}
        disabled={!paymentMethodSelected}
      >
        Thanh toán ngay
      </Button>
    </div>
  );
};

export default Payment;
