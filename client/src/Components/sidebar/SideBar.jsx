import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { ConfigProvider, Menu, theme } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt, BiMessageAltError } from "react-icons/bi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
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
      label: <Link to="/shopping">Cửa hàng</Link>,
    },
    {
      key: "3",
      label: <Link to="/don-hang-cua-ban">Đơn hàng của bạn</Link>,
      icon: <BiCategoryAlt />,
    },
    {
      key: "22",
      icon: <IoMdAddCircleOutline />,
      label: "Browse Instructors",
      className: "border-bottom",
    },
    {
      key: "23",
      icon: <IoSettingsOutline />,
      label: "Setting",
    },
    {
      key: "24",
      icon: <FaRegQuestionCircle />,
      label: "Help",
    },
    {
      key: "25",
      icon: <LuFlag />,
      label: "Report History",
    },
    {
      key: "26",
      icon: <BiMessageAltError />,
      label: "Send Feedback",
    },
  ];

  const studentItem = [
    {
      key: "1",
      icon: <BiCategoryAlt />,
      label: "Dashboard",
    },
    {
      key: "9",
      icon: <IoSettingsOutline />,
      label: "Setting",
    },
    {
      key: "10",
      icon: <FaRegQuestionCircle />,
      label: "Help",
    },
    {
      key: "11",
      icon: <LuFlag />,
      label: "Report History",
    },
    {
      key: "12",
      icon: <BiMessageAltError />,
      label: "Send Feedback",
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
