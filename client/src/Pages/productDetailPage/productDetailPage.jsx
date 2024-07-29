import { Col, Row, Tabs } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../Components/productDetail/ProductDetail";
import ProductInfo from "../../Components/productDetail/ProductInfo";
// import Reviews from "../../Components/productDetail/Reviews";
import "./productDetailPage.scss";
import Product from "../../Components/productsFeatured/productsFeatured";
import Products from "../../Components/products/products";

const ProductDetailPage = () => {
  const { productItemId } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  const tabItems = [
    {
      label: "About",
      key: "about",
      children: (
        <div className="course-content" style={{ padding: "20px 100px" }}>
          <ProductDetail productItemId={productItemId} />
        </div>
      ),
    },
    // Uncomment this section if you want to add the Reviews tab later
    // {
    //   label: 'Reviews',
    //   key: 'reviews',
    //   children: (
    //     <div className="course-content" style={{ padding: "20px" }}>
    //       <Reviews productItemId={productItemId} />
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <ProductInfo productItemId={productItemId} />
      <Tabs
        className="course-detail-tabs"
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={tabItems}
      />
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
