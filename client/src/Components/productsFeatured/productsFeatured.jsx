import React, { useEffect, useRef, useState } from "react";
import { Carousel, Spin } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./productsFeatured.scss";
import api from "../../config/axios";

import ProductCard from "../productCard/ProductCard";

const Product = () => {
  const navigate = useNavigate();
  const carouselRef = useRef();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickLoading, setClickLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/productitems/topsold");
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
    setClickLoading(true);
    navigate(`/chi-tiet-san-pham/${productItemId}`);
  };

  // const handlePrev = () => {
  //   carouselRef.current.prev();
  // };

  // const handleNext = () => {
  //   carouselRef.current.next();
  // };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="products-container">
      <div className="featured-container">
        <div
          className="featured-products"
          style={{ fontWeight: "bold", fontSize: "20px", color: "#ff469e" }}
        >
          Sản phẩm nổi bật
        </div>
      </div>
      <Carousel
        dots={false}
        slidesToScroll={1}
        slidesToShow={5}
        infinite={true}
        draggable
        ref={carouselRef}
      >
        {products.map((product) => (
          <div key={product.productItemId} className="carousel-item">
            <Spin spinning={clickLoading}>
              <ProductCard
                product={product}
                onClick={() => handleItemClick(product.productItemId)}
              />
            </Spin>
          </div>
        ))}
      </Carousel>
      {/* <div className="carousel__button">
        <Button onClick={handlePrev} icon={<LeftOutlined />} />
        <Button onClick={handleNext} icon={<RightOutlined />} />
      </div> */}
    </div>
  );
};

export default Product;
