import { Tabs } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseContent from "../../Components/courseDetail/CourseContent";
import CourseDetail from "../../Components/courseDetail/CourseDetail";
import CourseInfo from "../../Components/courseDetail/CourseInfo";
import InstructorInfo from "../../Components/courseDetail/InstructorInfo";
import Reviews from "../../Components/courseDetail/Reviews";
import "./productDetailPage.scss";

const { TabPane } = Tabs;

const ProductDetailPage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <CourseInfo courseId={courseId} />
      <InstructorInfo />
      <Tabs
        className="course-detail-tabs"
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
      >
        <TabPane tab="About" key="about">
          <div className="course-content" style={{ padding: "20px" }}>
            <CourseDetail courseId={courseId} />
          </div>
        </TabPane>
        <TabPane tab="Content" key="content">
          <div className="course-content" style={{ padding: "20px" }}>
            <CourseContent />
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="reviews">
          <div className="course-content" style={{ padding: "20px" }}>
            <Reviews courseId={courseId} />
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default ProductDetailPage;
