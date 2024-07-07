import React, { useState } from "react";
import { Form, Input, Button, Select, Tabs, Card, Typography } from "antd";
import "./PaymentForm.scss";

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handlePaymentMethodChange = (key) => {
    setPaymentMethod(key);
  };

  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <Card className="payment-form" title="Select Payment Method">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Tabs
          defaultActiveKey="creditCard"
          onChange={handlePaymentMethodChange}
        >
          <TabPane tab="Credit/Debit Card" key="creditCard">
            <Form.Item
              name="holderName"
              label="Holder Name"
              rules={[
                { required: true, message: "Please enter the holder name" },
              ]}
            >
              <Input placeholder="Enter Holder Name" />
            </Form.Item>
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[
                { required: true, message: "Please enter the card number" },
              ]}
            >
              <Input placeholder="Card #" />
            </Form.Item>
            <Form.Item
              name="expirationMonth"
              label="Expiration Month"
              rules={[
                {
                  required: true,
                  message: "Please select the expiration month",
                },
              ]}
            >
              <Select placeholder="Month">
                {Array.from({ length: 12 }, (_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    {i + 1}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="expirationYear"
              label="Expiration Year"
              rules={[
                {
                  required: true,
                  message: "Please select the expiration year",
                },
              ]}
            >
              <Select placeholder="Year">
                {Array.from({ length: 21 }, (_, i) => (
                  <Option key={i + 2024} value={i + 2024}>
                    {i + 2024}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="cvc"
              label="CVC"
              rules={[{ required: true, message: "Please enter the CVC" }]}
            >
              <Input placeholder="CVC" />
            </Form.Item>
          </TabPane>
          <TabPane tab="🏦 Bank Transfer" key="bankTransfer">
            <Form.Item
              name="accountHolderName"
              label="Account Holder Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the account holder name",
                },
              ]}
            >
              <Input placeholder="Enter Your Full Name" />
            </Form.Item>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter the account number" },
              ]}
            >
              <Input placeholder="Enter Account Number" />
            </Form.Item>
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[
                { required: true, message: "Please select the bank name" },
              ]}
            >
              <Select placeholder="State Bank of India">
                <Option value="State Bank of India">State Bank of India</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="ifscCode"
              label="IFSC Code"
              rules={[
                { required: true, message: "Please enter the IFSC code" },
              ]}
            >
              <Input placeholder="Enter IFSC Code" />
            </Form.Item>
          </TabPane>

          <TabPane tab="VNPAY" key="paypal">
            <p>
              After payment via PayPal's secure checkout, we will send you a
              link to download your files.
            </p>
          </TabPane>
        </Tabs>
        <Button type="primary" onClick={() => form.submit()}>
          VNPAY
        </Button>
      </Form>
      <div className="order-details">
        <Title level={3}>Order Details</Title>
        <Text>Baby Plan: $49</Text>
        <Text>Taxes(GST): $2</Text>
        <Title level={4}>Total: $51</Title>
      </div>
    </Card>
  );
};

export default PaymentForm;
