import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { ConfigProvider, Menu, theme } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import "./SideBar.scss";
import { Link } from "react-router-dom";

import { ShoppingOutlined } from "@ant-design/icons";

function SideBar({ collapsed }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("1");

  const items = [
    {
      key: "1",
      icon: <AiOutlineHome />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "2",
      icon: <ShoppingOutlined />,
      label: <Link to="/cua-hang">Cửa hàng</Link>,
    },
    {
      key: "3",
      label: <Link to="/don-hang-cua-ban">Đơn hàng của bạn</Link>,
      icon: <BiCategoryAlt />,
      className: "border-bottom",
    },
    {
      key: "23",
      icon: <IoSettingsOutline />,
      label: "Setting",
    },
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      style={{
        background: colorBgContainer,
      }}
      className="slide-bar-container"
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemColor: "black",
              itemSelectedColor: "white",
              itemSelectedBg: "#fc88c0  ",
              iconSize: 20,
              itemHoverBg: "#fc88c0",
              itemHoverColor: "white",
            },
          },
        }}
      >
        <Menu
          mode="inline"
          theme="light"
          items={items.map((item) => ({
            ...item,
            className:
              item.key === "18" || item.key === "22" ? "border-bottom" : "",
          }))}
          className="menu-style"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        />
      </ConfigProvider>
    </Sider>
  );
}

export default SideBar;
