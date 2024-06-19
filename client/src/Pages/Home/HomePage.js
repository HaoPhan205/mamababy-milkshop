import React from "react";
import { Layout } from "antd";
import SlideIndex from "../../Components/SlideIndex/SlideIndex";
import SideBar from "../../Components/sidebar/SideBar";
import Product from "../../Components/productsFeatured/productsFeatured";
import Products from "../../Components/products/products";
import "./HomePage.scss";

const { Content, Sider } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout">
      <Sider className="sider" style={{ background: "#fff", minHeight: "1vh" }}>
        <SideBar />
      </Sider>
      <Layout className="inner-layout">
        <Content className="content">
          <SlideIndex />
        </Content>
        <Content className="content">
          <Product />
        </Content>
        <Content className="content">
          <Products />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
