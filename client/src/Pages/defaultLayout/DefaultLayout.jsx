import { Layout } from "antd";
import React, { useState } from "react";
import Header from "../../Components/Layouts/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Layouts/footer/Footer";

function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

      <Layout style={{ overflowX: "hidden" }}>
        <Layout style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Layout
            style={{
              backgroundColor: "#F7F7F7",
              overflowX: "hidden",
            }}
          >
            <Outlet />
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default DefaultLayout;
