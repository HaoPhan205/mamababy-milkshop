// src/components/courseDetail/CourseContent.js
import React from 'react';
import { Collapse, Typography, List, Row, Col } from 'antd';
import { FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';
import "./CourseContent.scss";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const courseSections = [
    {
        title: 'Introduction to this Course',
        lectures: [
            { title: 'A Note On Asking For Help', type: 'text', duration: '00:12' },
            { title: 'Introducing Our TA', type: 'text', duration: '01:42' },
            { title: 'Join the Online Community', type: 'text', duration: '00:51' },
            { title: 'Why This Course?', type: 'video', duration: '07:48' },
            { title: 'Syllabus Download', type: 'text', duration: '2 pages' },
            { title: 'Syllabus Walkthrough', type: 'video', duration: '01:42' },
            { title: 'Lecture Slides', type: 'text', duration: '00:11' },
        ],
        totalLectures: 8,
        totalDuration: '22:08',
    },
    {
        title: 'Introduction to Front Endá',
        lectures: [
            // Add lectures for this section
        ],
        totalLectures: 6,
        totalDuration: '27:26',
    },
];

const CourseContent = () => (
    <div className="course-content">
        <Row justify="space-between" align="middle" className="content-header">
            <Col><Title level={3}>Course content</Title></Col>
            <Col> <Text>402 lectures</Text> <Text>47:06:29</Text></Col>
        </Row>
        <Collapse accordion>
            {courseSections.map((section, index) => (
                <Panel header={
                    <div className="panel-header">
                        <Text>{section.title}</Text>
                        <Text>{section.totalLectures} lectures</Text>
                        <Text>{section.totalDuration}</Text>
                    </div>
                } key={index}>
                    <List
                        itemLayout="horizontal"
                        dataSource={section.lectures}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.type === 'video' ? <PlayCircleOutlined /> : <FileTextOutlined />}
                                    title={<Text>{item.title}</Text>}
                                    description={<Text>{item.duration}</Text>}
                                />
                            </List.Item>
                        )}
                    />
                </Panel>
            ))}
        </Collapse>
    </div>
);

export default CourseContent;
