import React, { useEffect, useRef, useState } from "react";
import { Card, Badge, Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./productsFeatured.scss";
import { Link } from "react-router-dom";
import api from "../../config/axios";

const ProductCard = ({ product, onClick, onAddToCart }) => (
  <div className="product-card">
    <Card
      hoverable
      cover={
        <div className="product-card-image" onClick={onClick}>
          <img alt={product.itemName} src={product.image1} />
        </div>
      }
    >
      <div className="product-meta">
        <Card.Meta title={product.itemName} />
        <div className="product-price">{product.price} VNĐ</div>
      </div>
      <div className="products-info">
        <div>Đã bán {product.soldQuantity}</div>
        <ShoppingCartOutlined onClick={onAddToCart} style={{ fontSize: '20px', color: '#ff469e' }} />
      </div>
    </Card>
  </div>
);

const Product = () => {
  const navigate = useNavigate();
  const carouselRef = useRef();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleItemClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handleAddToCart = (productId) => {
    // Implement the logic for adding the product to the cart
    console.log("Product added to cart:", productId);
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  if (loading) {
    return <div>Loading...</div>;
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
        <Link to="/products-page" className="see-all-link">
          Xem tất cả
        </Link>
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
            <ProductCard
              product={product}
              onClick={() => handleItemClick(product.productItemId)}
              onAddToCart={() => handleAddToCart(product.productItemId)}
            />
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

export default Product;
