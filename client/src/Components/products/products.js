import React, { useRef, useState, useEffect } from "react";
import "./products.scss";
import { Card, Badge, Carousel, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";

const ProductCard = ({ product, onClick }) => (
  <div className="product-card" onClick={() => onClick(product.productItemId)}>
    <Badge.Ribbon
      text="BESTSELLER"
      color="gold"
      style={{ display: product.bestseller ? "block" : "none" }}
    >
      <Card
        hoverable
        cover={
          <div className="product-card-image">
            <img alt={product.itemName} src={product.image} />
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
            title={product.itemName}
            description={
              <div className="products-category">{product.category}</div>
            }
          />
          <div className="products-info">
            <div className="product-instructor">By {product.brandName}</div>
            <div className="product-price">${product.price.toFixed(2)}</div>
          </div>
          <div className="product-benefits">
            <div>{product.benefit}</div>
            <div>{product.description}</div>
          </div>
          <div className="product-company">
            <div>Brand: {product.brandName}</div>
            <div>Country: {product.countryName}</div>
            <div>Company: {product.companyName}</div>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  </div>
);

const Products = () => {
  const carouselRef = useRef();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/productitems");

        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = (productItemId) => {
    navigate(`/productitems/${productItemId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        {products.map((product) => (
          <div key={product.productItemId} className="carousel-item">
            <ProductCard product={product} onClick={handleItemClick} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Products;
