import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { productItemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className="product-additional-info">
      <div className="requirements">
        <Title level={2}>Thông tin sản phẩm</Title>
        <Paragraph style={{ color: "black" }}>{product?.description}</Paragraph>
      </div>
      <div className="description">
        <Title level={2}>Thương hiệu: </Title>
        <Paragraph style={{ color: "black" }}>{product?.brandName}</Paragraph>
      </div>
      <div className="description">
        <Title level={2}>Công ty sản xuất: </Title>
        <Paragraph style={{ color: "black" }}>{product?.companyName}</Paragraph>
      </div>
      <div className="description">
        <Title level={2}>Quốc gia: </Title>
        <Paragraph style={{ color: "black" }}>{product?.countryName}</Paragraph>
      </div>
    </div>
  );
};

export default ProductDetail;
