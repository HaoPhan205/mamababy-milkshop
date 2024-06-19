import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { ConfigProvider, Menu, theme } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt, BiMessageAltError } from "react-icons/bi";
import {
  FaRegCheckCircle,
  FaRegCreditCard,
  FaRegQuestionCircle,
  FaRegStar,
} from "react-icons/fa";
import { IoMdAddCircleOutline, IoMdNotificationsOutline } from "react-icons/io";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { GiBlackBook } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { GrCertificate } from "react-icons/gr";
import {
  MdOutlineAddCircleOutline,
  MdOutlineAttachMoney,
  MdOutlineLibraryBooks,
  MdPayments,
} from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { ShoppingOutlined } from "@ant-design/icons";

function SideBar({ collapsed }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
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
      label: <Link to="/livestream">Cửa hàng</Link>,
    },

    {
      key: "sub1",
      label: "Categories",
      icon: <BiCategoryAlt />,
      children: [
        { key: "5", label: "Development" },
        { key: "6", label: "Business" },
        { key: "7", label: "Finance & Accounting" },
        { key: "8", label: "IT & Software" },
        { key: "9", label: "Office Productivity" },
      ],
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
      key: "2",
      icon: <GiBlackBook />,
      label: "Purchased Courses",
    },
    {
      key: "3",
      icon: <TiMessages />,
      label: "Messages",
    },
    {
      key: "4",
      icon: <IoMdNotificationsOutline />,
      label: "Notifications",
    },
    {
      key: "5",
      icon: <GrCertificate />,
      label: "My Certificates",
    },
    {
      key: "6",
      icon: <FaRegStar />,
      label: "Reviews",
    },
    {
      key: "7",
      icon: <FaRegCreditCard />,
      label: "Credits",
    },
    {
      key: "8",
      icon: <MdOutlineLibraryBooks />,
      label: "Statements",
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

  const instructionItem = [
    {
      key: "1",
      icon: <BiCategoryAlt />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <GiBlackBook />,
      label: "Courses",
    },
    {
      key: "3",
      icon: <TbDeviceAnalytics />,
      label: "Analysics",
    },
    {
      key: "4",
      icon: <MdOutlineAddCircleOutline />,
      label: <Link to="create-course">Create Course</Link>,
    },
    {
      key: "5",
      icon: <TiMessages />,
      label: "Messages",
    },
    {
      key: "6",
      icon: <IoMdNotificationsOutline />,
      label: "Notifications",
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
              itemSelectedColor: "#ed2a26",
              itemSelectedBg: "#FFECEC",
              iconSize: 20,
              itemHoverBg: "#FFECEC",
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
