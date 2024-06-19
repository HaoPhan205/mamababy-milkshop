// src/pages/CourseDetailPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseContent from "../../Components/productDetail/CourseContent";
import CourseDetail from "../../Components/productDetail/CourseDetail";
import CourseInfo from "../../Components/productDetail/CourseInfo";
import InstructorInfo from "../../Components/productDetail/InstructorInfo";
import Reviews from "../../Components/productDetail/Reviews";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <CourseInfo courseId={courseId} />
      <InstructorInfo activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className="course-content"
        style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
      >
        {activeTab === "about" && <CourseDetail courseId={courseId} />}
        {activeTab === "content" && <CourseContent />}
        {activeTab === "reviews" && <Reviews courseId={courseId} />}
      </div>
    </>
  );
};

export default CourseDetailPage;
