import { Layout } from "antd";
import React, { useState } from "react";
import Header from "../../Components/Layouts/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Layouts/Footer/Footer";
import SideBar from "../../Components/sidebar/SideBar";

function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

      <Layout style={{ overflowX: "hidden" }}>
        <SideBar style={{ maxHeight: "100vh" }} collapsed={collapsed} />
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
