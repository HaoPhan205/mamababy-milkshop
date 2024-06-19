import React, { useRef } from "react";
import "./products.scss";

import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";
import { Card, Badge, Carousel, Typography } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import DataProductsFeatured from "../productsFeatured/dataProductsFeatured";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onClick }) => (
  <div className="product-card" onClick={onClick}>
    <Badge.Ribbon
      text="BESTSELLER"
      color="gold"
      style={{ display: product.bestseller ? "block" : "none" }}
    >
      <Card
        hoverable
        cover={
          <div className="product-card-image">
            <img alt={product.title} src={product.image} />
            <div className="product-duration-badge">{product.duration}</div>
            <div className="products-rating">
              <Typography className="star">★</Typography> {product.rating}
            </div>
          </div>
        }
      >
        <div className="product-meta">
          <div className="product-details">
            <span>{product.views}</span> • <span>{product.date}</span>
          </div>
          <Card.Meta
            title={product.title}
            description={
              <div className="products-category">{product.category}</div>
            }
          />
          <div className="products-info">
            <div className="product-instructor">By {product.instructor}</div>
            <div className="product-price">{product.price}</div>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  </div>
);
const Products = () => {
  const carouselRef = useRef();
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate("/product-detail");
  };
  return (
    <div className="products">
      <div className="products__title">
        <img src={icon1} alt="" className="icon1" />
        <h3 style={{ padding: "20px" }}>Dành cho bạn</h3>
        <img src={icon2} alt="" className="icon2" />
      </div>

      <Carousel
        dots={false}
        slidesToScroll={1}
        slidesToShow={4}
        infinite={true}
        draggable
        ref={carouselRef}
      >
        {DataProductsFeatured.map((product) => (
          <div key={product.id} className="carousel-item">
            <ProductCard product={product} onClick={handleItemClick} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default Products;
