import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Tabs,
  Card,
  Typography,
  message,
} from "antd";
import "./PaymentForm.scss";
import api from "../../config/axios";
import { Data } from "../../App";
import { useContext } from "react";

const { TabPane } = Tabs;
const { Option } = Select;
const { Title } = Typography;

const PaymentForm = ({ totalPrice }) => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const { user } = useContext(Data);
  const [totalAmount, setTotalAmount] = useState(totalPrice);

  useEffect(() => {
    setTotalAmount(totalPrice);
  }, [totalPrice]);

  const handlePaymentMethodChange = (key) => {
    setPaymentMethod(key);
  };

  const onFinish = async (values) => {
    try {
      const orderData = {
        orderId: user.customerId,
        customerId: user.customerId,
        deliveryManId: 1,
        orderDate: new Date().toISOString(),
        shippingAddress: values.shippingAddress,
        totalAmount: totalAmount,
        storageId: 1,
        deliveryName: "DeliveryMan A",
        deliveryPhone: values.deliveryPhone,
        paymentMethod: paymentMethod,
        status: "Pending",
      };

      const orderResponse = await api.post("/api/orders", orderData);
      console.log("Order submitted:", orderResponse.data);
      message.success("Order placed successfully!");

      const paymentResponse = await api.post("/api/VNPay/payment", {
        totalAmount: totalAmount,
        customerId: user.customerId,
      });
      const paymentLink = paymentResponse.data.paymentLink;
      window.location.href = paymentLink;
    } catch (error) {
      console.error("Error submitting order:", error);
      message.error("Failed to place order. Please try again later.");
    }
  };

  return (
    <Card className="payment-form" title="Choose Payment Method">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Tabs
          defaultActiveKey="creditCard"
          onChange={handlePaymentMethodChange}
        >
          <TabPane tab="VNPay" key="vnpay">
            <p>
              After payment via VNPay, we will send you a link to download your
              file.
            </p>
            <Title level={4}>Total Amount: {totalAmount} VNĐ</Title>
          </TabPane>
          {/* Other payment methods tabs */}
        </Tabs>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Place Order
          </Button>
        </Form.Item>
      </Form>
      <div className="order-details"></div>
    </Card>
  );
};

export default PaymentForm;
