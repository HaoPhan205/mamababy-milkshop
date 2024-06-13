import React, { useRef } from "react";
import { Card, Badge, Carousel, Button, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./productsFeatured.scss";
import { Link } from "react-router-dom";
import products from "./dataProductsFeatured";

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
  const navigate = useNavigate();
  const carouselRef = useRef();

  const handleItemClick = () => {
    navigate("/product-detail");
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="products-container">
      <div className="featured-container">
        <div
          className="featured-products"
          style={{ fontWeight: "bold", fontSize: "20px", color: "#ff469e" }}
        >
          Sản phẩm nổi bật
        </div>
        <Link to="/products-page" className="see-all-link">
          Xem tất cả
        </Link>
      </div>
      <Carousel
        dots={false}
        slidesToScroll={1}
        slidesToShow={4}
        infinite={true}
        draggable
        ref={carouselRef}
      >
        {products.map((product) => (
          <div key={product.id} className="carousel-item">
            <ProductCard product={product} onClick={handleItemClick} />
          </div>
        ))}
      </Carousel>
      <div className="carousel__button">
        <Button onClick={handlePrev} icon={<LeftOutlined />} />
        <Button onClick={handleNext} icon={<RightOutlined />} />
      </div>
    </div>
  );
};

export default Products;
