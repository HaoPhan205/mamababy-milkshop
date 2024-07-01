import React from "react";
import { Col, Row } from "antd";
import SlideIndex from "../../Components/SlideIndex/SlideIndex";
import Product from "../../Components/productsFeatured/productsFeatured";
import Products from "../../Components/products/products";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <SlideIndex />
      </Col>
      <Col span={24}>
        <Product />
      </Col>
      <Col span={24}>
        <Products />
      </Col>
    </Row>
  );
};

export default HomePage;
