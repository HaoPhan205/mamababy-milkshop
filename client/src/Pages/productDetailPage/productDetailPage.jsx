import { Col, Row, Tabs } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../Components/productDetail/ProductDetail";
import ProductInfo from "../../Components/productDetail/ProductInfo";
import Reviews from "../../Components/productDetail/Reviews";
import "./productDetailPage.scss";
import Product from "../../Components/productsFeatured/productsFeatured";
import Products from "../../Components/products/products";

const { TabPane } = Tabs;

const ProductDetailPage = () => {
  const { productItemId } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <ProductInfo productItemId={productItemId} />
      <Tabs
        className="course-detail-tabs"
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
      >
        <TabPane tab="About" key="about">
          <div className="course-content" style={{ padding: "20px 100px" }}>
            <ProductDetail productItemId={productItemId} />
          </div>
        </TabPane>
        {/* <TabPane tab="Reviews" key="reviews">
          <div className="course-content" style={{ padding: "20px" }}>
            <Reviews productItemId={productItemId} />
          </div>
        </TabPane> */}
      </Tabs>
      <Row
        gutter={[16, 16]}
        justify="center"
        style={{ background: "white", padding: "20px 0" }}
      >
        <Col span={20}>
          <Product />
        </Col>
        <Col span={20}>
          <Products />
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailPage;
