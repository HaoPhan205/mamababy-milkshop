import { Affix, Layout } from "antd";
import React, { useState } from "react";
import Header from "../../Components/Layouts/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Layouts/footer/Footer";

const { Content } = Layout;

function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Affix offsetTop={0}>
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      </Affix>
      <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Content style={{ padding: "1.5em", backgroundColor: "#F7F7F7" }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default DefaultLayout;
