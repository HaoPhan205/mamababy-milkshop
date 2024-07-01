// src/components/courseDetail/Reviews.js
import { Avatar, Button, Card, Col, List, Progress, Rate, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import "./Review.scss";

const { Title, Text, Paragraph } = Typography;

const Reviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/course/${courseId}`);
        setReviews(response.data.data.reviews);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={10}>
        <Card bordered={false} className="student-feedback">
          <Title level={4}>Student Feedback</Title>
          <div className="course-rating">
            <Rate allowHalf defaultValue={4.5} style={{ color: '#fadb14', fontSize: '1.2em' }} disabled />
            <span className="ant-rate-text">4.6 Course Rating</span>
          </div>
          <List
            dataSource={reviews.map(review => ({ star: review.starRating, percent: review.starRating * 20 }))}
            renderItem={item => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col span={4}>
                    <Rate count={1} defaultValue={1} style={{ color: '#fadb14', fontSize: '1em' }} disabled />
                  </Col>
                  <Col span={14}>
                    <Progress percent={item.percent} showInfo={false} strokeColor="#ff4d4f" />
                  </Col>
                  <Col span={6}>
                    <Text>{item.percent}%</Text>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} md={14}>
        <Card bordered={false} className="reviews">
          <Row justify="space-between" align="middle">
            <Title level={4}>Reviews</Title>
          </Row>
          <List
            dataSource={reviews}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://robohash.org/${item.userId}`} />}
                  title={<Text>{item.userId} <Text type="secondary">{new Date(item.rateAt).toLocaleDateString()}</Text></Text>}
                  description={
                    <>
                      <Rate allowHalf defaultValue={item.starRating} style={{ color: '#fadb14', fontSize: '1em' }} disabled />
                      <Paragraph>{item.comment}</Paragraph>
                      <div>
                        <Text>Was this review helpful? </Text>
                        <Button type="link" style={{ marginLeft: 8 }}>Report</Button>
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Reviews;
