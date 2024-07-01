// src/components/courseDetail/CourseAdditionalInfo.js
import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import "./CourseDetail.scss";

const { Title, Paragraph } = Typography;

const CourseDetail = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/course/${courseId}`);
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
    <div className="course-additional-info">
      <div className="requirements">
        <Title level={2}>Requirements</Title>
        <List
          dataSource={course.requirement.split(',')}
          renderItem={item => (
            <List.Item>
              <Typography.Text>{item.trim()}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
      <div className="description">
        <Title level={2}>Description</Title>
        <Paragraph>
          {course.description.split('\n').map((text, index) => (
            <span key={index}>
              {text}
              <br />
            </span>
          ))}
        </Paragraph>
      </div>
      <div className="target-audience">
        <Title level={2}>Who this course is for</Title>
        <List
          dataSource={course.targetAudience.split(',')}
          renderItem={item => (
            <List.Item>
              <Typography.Text>{item.trim()}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
      <div className="learn-what">
        <Title level={2}>What you'll learn</Title>
        <List
          dataSource={course.learnWhat.split(',')}
          renderItem={item => (
            <List.Item>
              <Typography.Text>{item.trim()}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CourseDetail;
