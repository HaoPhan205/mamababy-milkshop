import React, { useState } from 'react';
import { FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Avatar, Button, Typography, Row, Col } from 'antd';
import "./InstructorInfo.scss";

const { Text, Title } = Typography;

const instructor = {
  name: 'Johnson Smith',
  avatar: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png', // Replace with the correct path to your image
  views: '1,452',
  likes: '100',
  dislikes: '20',
  shares: '9'
};

const InstructorInfo = ({ activeTab, setActiveTab }) => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  return (
    <div className="course-instructor-section">
      <Row className="course-instructor" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} className="instructor-info">
          <Avatar src={instructor.avatar} size={50} />
          <div className="name-subscribe">
            <Title level={5}>{instructor.name}</Title>
            <Button 
              type="primary" 
              className={subscribed ? 'unsubscribe' : 'subscribe'}
              onClick={handleSubscribe}
            >
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} className="instructor-stats">
          <div className="stat-item"><FaEye /> <Text>{instructor.views}</Text></div>
          <div className="stat-item"><FaThumbsUp /> <Text>{instructor.likes}</Text></div>
          <div className="stat-item"><FaThumbsDown /> <Text>{instructor.dislikes}</Text></div>
        </Col>
      </Row>
      <Row className="course-tabs" justify="center" gutter={[16, 16]}>
        <Col>
          <Button 
            type="link" 
            onClick={() => setActiveTab('about')} 
            className={activeTab === 'about' ? 'active-tab' : ''}
          >
            About
          </Button>
        </Col>
        <Col>
          <Button 
            type="link" 
            onClick={() => setActiveTab('content')} 
            className={activeTab === 'content' ? 'active-tab' : ''}
          >
            Courses Content
          </Button>
        </Col>
        <Col>
          <Button 
            type="link" 
            onClick={() => setActiveTab('reviews')} 
            className={activeTab === 'reviews' ? 'active-tab' : ''}
          >
            Reviews
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default InstructorInfo;
