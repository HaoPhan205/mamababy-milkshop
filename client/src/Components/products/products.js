import React, { useState, useEffect } from "react";
import "./products.scss";
import { Card, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import icon1 from "../../Assets/ticker-cute-1.png";
import icon2 from "../../Assets/ticker-cute-2.png";

import ProductCard from "../../Components/productCard/ProductCard"

const Products = ({ productItemId }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/productitems");
        setProducts(response.data.slice(0, 16)); // Show only the first 16 products
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = (productItemId) => {
    navigate(`/chi-tiet-san-pham/${productItemId}`);
  };

  const handleAddToCart = (productId) => {
    console.log("Product added to cart:", productId);
  };

  const handleSeeMore = () => {
    navigate("/cua-hang");
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
        <h1 style={{ padding: "20px" }}>Dành cho bạn</h1>
        <img src={icon2} alt="" className="icon2" />
      </div>

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.productItemId} xs={24} sm={12} md={8} lg={6}>
            <ProductCard
              product={product}
              onClick={() => handleItemClick(product.productItemId)}
              onAddToCart={() => handleAddToCart(product.productItemId)}
            />
          </Col>
        ))}
      </Row>

      <div className="see-more">
        <Button type="primary" onClick={handleSeeMore}>
          Thăm cửa hàng
        </Button>
      </div>
    </div>
  );
};

export default Products;
