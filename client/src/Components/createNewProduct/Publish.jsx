import { EditOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import React from 'react';
import './Publish.scss';

const { Paragraph, Title } = Typography;

function Publish() {
  return (
    <div className="publish-container">
      <Title level={4}>Publish</Title>
      <Card className="publish-card">
        <div className="icon-container">
          <EditOutlined className="edit-icon" />
        </div>
        <Paragraph className="publish-paragraph">
          Your course is in a draft state. Students cannot view, purchase or enrol in this course. For students that are already enrolled, this course will not appear on their student Dashboard.
        </Paragraph>
      </Card>
    </div>
  );
}

export default Publish;
