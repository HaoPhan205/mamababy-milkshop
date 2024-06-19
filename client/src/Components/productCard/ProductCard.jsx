import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { PiPlayFill } from "react-icons/pi";
import "./CourseCard.scss";
import { Typography } from "antd";

function CourseCard() {
  return (
    <div className="container">
      <div className="card">
        <div className="course-card-image">
          <img
            src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
            alt="img"
          />
          <div
            className="course-duration-badge"
            style={{ bottom: "18px", right: "15px" }}
          >
            25 hourse
          </div>
          <div className="courses-rating" style={{ left: "10px", top: "20px" }}>
            <Typography className="star" style={{ marginTop: "-3px" }}>
              ★
            </Typography>{" "}
            5.0
          </div>
          <span className="play-effect">
            <PiPlayFill
              size={60}
              style={{ position: "absolute", top: "40%", left: "42%" }}
            />
          </span>
        </div>

        <div className="content">
          <p className="views-times">109k views · 15 days ago </p>
          <h3>Complete Python Bootcamp: Go to hero in Python 3</h3>
          <p className="course-category">Web Development | Python</p>
          <div className="course-info">
            <p className="course-instructor">
              By <span>John Doe</span>
            </p>
            <div className="course-price">
              <span>
                <TiShoppingCart size={23} />
              </span>
              <p>$10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
