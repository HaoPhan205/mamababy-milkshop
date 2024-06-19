// src/components/courseDetail/CourseInfo.js
import { Button, Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaFlag, FaRegHeart } from 'react-icons/fa';
import api from '../../config/axios';
import "./CourseInfo.scss";

const { Title, Paragraph, Text } = Typography;

const CourseInfo = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);
        setCourse(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="course-detail">
      <Row gutter={[16, 16]} className="course-header">
        <Col xs={24} md={8} className="course-media">
          <div className="course-image">
          
              <img src="https://datatrained.com/dt-finance/wp-content/uploads/2023/04/Professional-Courses.jpg" alt={course.courseTitle} />
            
            <Button className="preview-button">Preview this course</Button>
            <div className="course-label">BESTSELLER</div>
          </div>
          <div className="social-actions">
            <Button className="save" icon={<FaRegHeart />}>Save</Button>
            <Button className="report-abuse" icon={<FaFlag />}>Report abuse</Button>
          </div>
        </Col>
        <Col xs={24} md={16} className="course-info">
          <Title level={1}>{course.courseTitle}</Title>
          <Paragraph style={{ color: 'white' }}>{course.description}</Paragraph>
          <div className="course-rating">
            <div className="rating">
              <Text className="star">★</Text> {course.averageRating}
            </div>
            <div>({course.totalReview} ratings)</div>
          </div>
          <div className="course-stats">
            <div className="stat">20 students enrolled</div>
            <div className="last-updated">Last updated {new Date(course.lastUpdate).toLocaleDateString()}</div>
          </div>
          <div className="course-actions">
            <Button type="primary" className="add-to-cart">Add to Cart</Button>
            <Button type="default" className="buy-now">Buy Now</Button>
          </div>
          <div className="guarantee">
            30-Day Money-Back Guarantee
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CourseInfo;
