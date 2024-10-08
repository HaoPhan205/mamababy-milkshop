import React, { useState } from "react";
import "./ProductCard.scss";
import { Card, Modal, Button, message, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// import api from "../../config/axios";

import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reduxReducer/cartSlice";

function ProductCard({ product, onClick }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/sign-in");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      if (product) {
        const pro = {
          ...product,
          quantity: 1,
        };
        dispatch(addToCart(pro));
        message.success("Sản phẩm đã được thêm vào giỏ hàng");
      } else {
        message.error("Sản phẩm không hợp lệ");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="product-card">
      <Spin spinning={loading}>
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
            <div className="product-price">
              {formatCurrency(product?.total)}
              {product?.discount > 0 && (
                <span className="product-discount"> - {product.discount}%</span>
              )}
            </div>
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
          open={isModalVisible}
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
        </Modal>
      </Spin>
    </div>
  );
}

export default ProductCard;
