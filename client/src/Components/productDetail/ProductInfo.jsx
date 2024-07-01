import { Button, Card, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { FaFlag, FaRegHeart } from "react-icons/fa";
import api from "../../config/axios";
import "./ProductInfo.scss";

const { Title, Paragraph, Text } = Typography;

const ProductInfo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productitems/${productId}`);
        setProduct(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="product-detail">
      <Row gutter={[16, 16]} className="product-header">
        <Col xs={24} md={8} className="product-media">
          <div className="product-image">
            <img
              src="https://datatrained.com/dt-finance/wp-content/uploads/2023/04/Professional-Courses.jpg"
              alt={product.productTitle}
            />

            <Button className="preview-button">Preview this course</Button>
            <div className="product-label">BESTSELLER</div>
          </div>
          <div className="social-actions">
            <Button className="save" icon={<FaRegHeart />}>
              Save
            </Button>
            <Button className="report-abuse" icon={<FaFlag />}>
              Report abuse
            </Button>
          </div>
        </Col>
        <Col xs={24} md={16} className="product-info">
          <Title level={1}>{product.productTitle}</Title>
          <Paragraph style={{ color: "white" }}>
            {product.description}
          </Paragraph>
          <div className="product-rating">
            <div className="rating">
              <Text className="star">★</Text> {product.averageRating}
            </div>
            <div>({product.totalReview} ratings)</div>
          </div>
          <div className="product-stats"></div>
          <div className="product-actions">
            <Button type="primary" className="add-to-cart">
              Thêm vào giỏ hàng
            </Button>
            <Button type="default" className="buy-now">
              Mua ngay
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductInfo;
