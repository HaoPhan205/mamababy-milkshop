import React, { useState, useEffect } from "react";
import "./products.scss";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import {ShoppingCartOutlined } from "@ant-design/icons";
import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";

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

const Products = ({productItemId}) => {
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

  const handleAddToCart = (productId) => {
    console.log("Product added to cart:", productId);
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

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.productItemId} xs={24} sm={12} md={4} lg={4}>
            <ProductCard
              product={product}
              onClick={() => handleItemClick(product.productItemId)}
              onAddToCart={() => handleAddToCart(product.productItemId)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
