import React from 'react';
import './OrderForm.scss';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const OrderForm = () => {
  return (
    <div className="order-summary">
      <Title level={2}>Order Summary</Title>
      <div className="line"></div>
      <div className="item">
        <Text>Baby Plan</Text>
        <Text>$49</Text>
      </div>
      <div className="item">
        <Text>Taxes(GST)</Text>
        <Text>$2</Text>
      </div>
      <div className="total">
        <Text>Total</Text>
        <Text>$51</Text>
      </div>
      <div className="secure-checkout">
        <Text>🔒 Secure checkout</Text>
      </div>
    </div>
  );
}

export default OrderForm;
