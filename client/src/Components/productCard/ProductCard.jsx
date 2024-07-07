import React from "react";
import "./ProductCard.scss";
import { Card, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductCard({ product, onClick, onAddToCart }) {
  return (
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
}

export default ProductCard;
