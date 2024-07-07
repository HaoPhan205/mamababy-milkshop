import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import Slider from "react-slick";
import api from "../../config/axios";
import "./ProductInfo.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Title, Paragraph } = Typography;

const ProductInfo = ({ productItemId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/productitems/${productItemId}`);
        console.log(response.data.data);  // Log the response data
        setProduct(response.data.data);
      } catch (err) {
        console.error(err);  // Log the error
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
          <Paragraph style={{ color: "white" }}>{product?.benefit}</Paragraph>
          <div className="product-stats">Còn {product?.stockQuantity} sản phẩm</div>
          <div className="product-stats">Số lượng</div>
          <div className="product-actions">
            <Button type="primary" className="add-to-cart">
              Thêm vào giỏ hàng
            </Button>
            <Button type="default" className="buy-now">
              Mua ngay
            </Button>
          </div>
          <div className="guarantee">Đã bán {product?.soldQuantity}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductInfo;
  