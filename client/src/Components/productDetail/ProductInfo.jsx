import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Typography, InputNumber, Modal } from "antd";
import Slider from "react-slick";
import api from "../../config/axios";
import "./ProductInfo.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ProductInfo = () => {
  const { productItemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/productitems/${productItemId}`);
        setProduct(response.data); // Assuming response.data contains the product details
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productItemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      showModal();
    } else {
      // Add to cart logic here
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn()) {
      showModal();
    } else {
      // Buy now logic here
    }
  };

  const isLoggedIn = () => {
    // Replace with actual login check logic
    return false;
  };

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

  const onQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <Card className="product-detail">
      <Row gutter={[16, 16]} className="product-header">
        <Col xs={24} md={8} className="product-media">
          {product && (
            <Slider {...settings}>
              {product.image1 && (
                <div>
                  <img src={product.image1} alt={product.itemName} />
                </div>
              )}
              {product.image2 && (
                <div>
                  <img src={product.image2} alt={product.itemName} />
                </div>
              )}
              {product.image3 && (
                <div>
                  <img src={product.image3} alt={product.itemName} />
                </div>
              )}
            </Slider>
          )}
        </Col>
        <Col xs={24} md={16} className="product-info">
          <Title level={1} className="product-title">
            {product?.itemName}
          </Title>
          <Paragraph style={{ color: "black" }}>{product?.benefit}</Paragraph>
          <div className="product-stats">
            Còn {product?.stockQuantity} sản phẩm
          </div>
          <div className="product-stats">
            Số lượng
            <InputNumber
              min={1}
              max={product?.stockQuantity}
              value={quantity}
              onChange={onQuantityChange}
            />
          </div>
          <div className="product-actions">
            <Button
              type="primary"
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button type="default" className="buy-now" onClick={handleBuyNow}>
              Mua ngay
            </Button>
          </div>
          <div className="guarantee">Đã bán {product?.soldQuantity}</div>
        </Col>
      </Row>
      <Modal
        title="Đăng nhập"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.</p>
      </Modal>
    </Card>
  );
};

export default ProductInfo;
