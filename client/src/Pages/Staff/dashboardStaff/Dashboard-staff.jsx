import React from "react";
import { Row, Col, Card, Statistic, Button, Space } from "antd";
import {
  WindowsOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyOutlined,
  UserAddOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./Dashboard-staff.scss";
import { LeftOutlined, RightOutlined, TrophyTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { List, Typography } from "antd";

const { Title } = Typography;
// const updates = [
//     'Improved performance on Studio Dashboard',
//     'See more Dashboard updates',
//     'See issues-at-glance for Live',
//   ];
const courses = [
  {
    key: "1",
    image:
      "https://i.pinimg.com/236x/ed/66/63/ed666327dd3ce274d94f2b3547155891.jpg", // Update with actual image path
    title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
    time: "First 2 days 22 hours",
    views: "1.5k",
    purchased: 150,
    likes: 500,
    comments: 915,
    reviews: 255,
  },
  {
    key: "2",
    image:
      "https://i.pinimg.com/236x/97/02/99/970299bccfa87fece07ca0b580f7e2cc.jpg", // Update with actual image path
    title: "The Complete JavaScript Course 2020: Build Real Projects!",
    time: "Second 4 days 9 hours",
    views: "175k",
    purchased: "1k",
    likes: "85k",
    comments: 915,
    reviews: 255,
  },
];
const coursesnew = [
  {
    key: "1",
    image:
      "https://i.pinimg.com/236x/63/94/f5/6394f5e99919e42f3278307506b8e73e.jpg", // Update with actual image path
    title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
    time: "First 2 days 22 hours",
    views: "1.5k",
    purchased: 500,
    likes: 999,
  },
  {
    key: "2",
    image:
      "https://i.pinimg.com/236x/9e/49/5e/9e495ec4a19556b9a47e7ac8a0ce9b06.jpg", // Update with actual image path
    title: "The Complete JavaScript Course 2020: Build Real Projects!",
    time: "Second 4 days 9 hours",
    views: "3.5",
    purchased: 300,
    likes: 560,
  },
];
// const Updates = () => {
//   return (
//     <Card style={{ width: 300 }}>
//       <Title level={4}>What's new in Cursus</Title>
//       <List
//         dataSource={updates}
//         renderItem={item => (
//           <List.Item>
//             {item}
//           </List.Item>
//         )}
//       />
//     </Card>
//   );
// };

const DashboardIntructor = () => {
  const [currentCourse, setCurrentCourse] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);

  const nextCourse = () => {
    setCurrentCourse((currentCourse + 1) % courses.length);
  };

  const prevCourse = () => {
    setCurrentCourse((currentCourse - 1 + courses.length) % courses.length);
  };

  const nextNews = () => {
    setCurrentNews((currentNews + 1) % coursesnew.length);
  };

  const prevNews = () => {
    setCurrentNews((currentNews - 1 + coursesnew.length) % coursesnew.length);
  };

  return (
    <div className="dashboard">
      <p>
        <WindowsOutlined /> Intructor Dashboard{" "}
      </p>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Sales" value={350} prefix="$" />

            <div className="styled-box" style={{ backgroundColor: "plum" }}>
              <span>New $50</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Enroll"
              value={1500}
              prefix={<UserAddOutlined />}
            />
            <div
              className="styled-box"
              style={{ backgroundColor: "yellowgreen" }}
            >
              <span>New 10</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Courses"
              value={130}
              prefix={<BookOutlined />}
            />

            <div className="styled-box" style={{ backgroundColor: "plum" }}>
              <span>New 10</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={2650}
              prefix={<TeamOutlined />}
            />
            <div
              className="styled-box"
              style={{ backgroundColor: "yellowgreen" }}
            >
              <span>New 120</span>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="course-creation-container">
        <BookOutlined className="icon" />
        <span className="text">Jump Into Course Creation</span>
        <Button type="primary" className="create-course-button">
          Create Your Course
        </Button>
      </div>

      <Row gutter={12}>
        <Col span={8}>
          <Card title="Latest Courses performance">
            <div style={{ display: "flex", alignItems: "start" }}>
              <Button icon={<LeftOutlined />} onClick={prevCourse} />
              <div style={{ flexGrow: 1 }}>
                <img
                  src={courses[currentCourse].image}
                  alt={courses[currentCourse].title}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
                <h5>{courses[currentCourse].time}</h5>
                <h2>{courses[currentCourse].title}</h2>
                <p>View: {courses[currentCourse].views} </p>
                <p>Purchased: {courses[currentCourse].purchased}</p>
                <p>Total Like: {courses[currentCourse].likes}</p>
                <hr />
                <div className="course-links">
                  <p>GO TO COURSE ANALYTICS</p>

                  <p>SEE COMMENTS ({courses[currentCourse].comments})</p>
                  <p>SEE REVIEWS ({courses[currentCourse].reviews})</p>
                </div>
              </div>
              <Button icon={<RightOutlined />} onClick={nextCourse} />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="News">
            <div style={{ display: "flex", alignItems: "start" }}>
              <Button icon={<LeftOutlined />} onClick={prevNews} />
              <div>
                <img
                  src={coursesnew[currentNews].image}
                  alt={coursesnew[currentNews].title}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
                <h5>{coursesnew[currentNews].time}</h5>
                <h2>{coursesnew[currentNews].title}</h2>
                <p>View: {coursesnew[currentNews].views} </p>
                <p>Purchased: {coursesnew[currentNews].purchased}</p>
                <p>Total Like: {coursesnew[currentNews].likes}</p>
                <hr />
                <p className="newlearn">Learn More</p>
              </div>
              <Button icon={<RightOutlined />} onClick={nextNews} />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Profile Analytics">
            <p>Current subscribers: 856</p>
            <p>
              View: 17k <span style={{ color: "red" }}>▼ 75%</span>
            </p>
            <p>
              Purchased (per hour): 1{" "}
              <span style={{ color: "red" }}>▼ 100%</span>
            </p>
            <p>
              Enroll (per hour): 50 <span style={{ color: "red" }}>▼ 70%</span>
            </p>
          </Card>
          <Row>
            <Col span={80}>
              <Card title="Submit Courses">
                <p>The Complete JavaScript Course 2020: Build Real Projects!</p>
                <Button type="primary" danger>
                  Pending
                </Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={80}>
              <Card title="What news">
                <p>The Complete JavaScript Course 2020: Build Real Projects!</p>

                <p> Improve performance on Studio</p>

                <p>See more Dashboard update</p>

                <p>See issues-at-glance for Live</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardIntructor;
