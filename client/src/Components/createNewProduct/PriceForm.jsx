import { DollarOutlined, TagOutlined } from '@ant-design/icons';
import { Card, Col, Input, Radio, Row, Space, Switch, Typography } from 'antd';
import React, { useState } from 'react';
import './PriceForm.scss';

const { Title } = Typography;

const PriceForm = () => {
  const [priceType, setPriceType] = useState('free');

  const handlePriceTypeChange = e => {
    setPriceType(e.target.value);
  };

  return (
    <div className="price-form">
      <Title level={4}>Price</Title>
      <Card className="price-type-card">
        <Radio.Group value={priceType} onChange={handlePriceTypeChange} className="price-type-group" buttonStyle="solid">
          <Radio.Button value="free" className={priceType === 'free' ? 'selected' : ''}>
            <TagOutlined /> Free
          </Radio.Button>
          <Radio.Button value="paid" className={priceType === 'paid' ? 'selected' : ''}>
            <DollarOutlined /> Paid
          </Radio.Button>
        </Radio.Group>
        {priceType === 'free' ? (
          <div className="switch-options">
            <Space direction="vertical">
              <div>
                <Switch className="custom-switch" /> Require Log In
              </div>
              <div>
                <Switch className="custom-switch" /> Require Enroll
              </div>
            </Space>
            <p className="note-text">
              If the course is free, if student require to enroll your course, if not required enroll, if students required sign in to your website to take this course.
            </p>
          </div>
        ) : (
          <div className="price-inputs">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <label>Regular Price*</label>
                <Input placeholder="$0" addonAfter="USD" />
              </Col>
              <Col span={12}>
                <label>Discount Price*</label>
                <Input placeholder="$0" addonAfter="USD" />
              </Col>
            </Row>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PriceForm;
