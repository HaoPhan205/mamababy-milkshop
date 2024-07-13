import React, { useState } from "react";
import "./ProductCard.scss";
import { Card, Modal, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/reduxReducer/cartSlice";

function ProductCard({ product, onClick }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/sign-in");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddToCart = async () => {
    const pro = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(pro));
    message.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

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
          <ShoppingCartOutlined
            onClick={handleAddToCart}
            style={{ fontSize: "20px", color: "#ff469e" }}
          />
        </div>
      </Card>
      <Modal
        title="Đăng nhập"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Đăng nhập
          </Button>,
        ]}
      >
        <p>Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.</p>
        {/* Include your login form here */}
      </Modal>
    </div>
  );
}

export default ProductCard;
