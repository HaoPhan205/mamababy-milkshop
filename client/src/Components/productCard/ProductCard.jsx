import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { PiPlayFill } from "react-icons/pi";
import "./ProductCard.scss";
import { Typography } from "antd";

function ProductCard({ product, onClick }) {
  return (
    <div className="container">
      <div className="card" onClick={onClick}>
        <div className="course-card-image">
          <img
            src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
            alt="img"
          />
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
          <p className="views-times">Thương hiệu: {product.brandName} </p>
          <h3>{product.itemName}</h3>
          <p className="course-category">{product.description}</p>
          <div className="course-info">
            <p className="course-instructor">
              By <span>John Doe</span>
            </p>
            <div className="course-price">
              <span>
                <TiShoppingCart size={23} />
              </span>
              <p>{product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
