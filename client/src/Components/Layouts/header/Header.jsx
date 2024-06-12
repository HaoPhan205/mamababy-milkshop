import "./Header.scss";
import {
  SearchOutlined,
  MailOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "../../logo/Logo"
import { Avatar, Badge, Button, Dropdown, Flex, Layout, Space, theme } from "antd";
import React, { useState } from "react";
import SideBar from "../../sidebar/SideBar";

const { useToken } = theme;
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Curus dashboard
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Paid Memberships
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Setting
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Help
      </a>
    ),
  },
  {
    key: "5",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Send Feddback
      </a>
    ),
  },
  {
    key: "6",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Sign Out
      </a>
    ),
  },
];

function Header({ collapsed, toggleCollapsed }) {
  const { token } = useToken();
  const navigate = useNavigate();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  // const [collapsed, setCollapsed] = useState(false);
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  //   console.log(collapsed);
  // };
  const handleCreateCourseClick = () => {
    navigate("/create-course"); // Navigate to the create course page
  };
  return (
        <header className="header">
          <div className="header__lef">
            <div className="header__menu">
              <Button
                type="primary"
                danger
                style={{
                  width: "80px",
                  height: "50px",
                }}
                onClick={toggleCollapsed}
              >
                <MenuOutlined />
              </Button>
            </div>
            <div className="header__logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
                alt=""
                width={100}
              />
            </div>
            <div className="header__search">
              <SearchOutlined />
              <input type="text" placeholder="Ba mẹ muốn tìm mua gì hôm nay ?" />
            </div>
          </div>

          <div className="header__right">
            <Button type="primary" className="my-custom-button" onClick={handleCreateCourseClick}>
              Create new Course
            </Button>
            <Badge count={1}>
              <ShoppingCartOutlined style={{ fontSize: "1.5em" }} />
            </Badge>
            <Badge count={1}>
              <MailOutlined style={{ fontSize: "1.5em" }} />
            </Badge>
            <Badge count={1}>
              <BellOutlined style={{ fontSize: "1.5em" }} />
            </Badge>

            <Dropdown
              menu={{
                items,
              }}
              dropdownRender={(menu) => (
                <div style={contentStyle}>
                  <Space
                    style={{
                      padding: 8,
                      margin: "1em",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <Flex gap={5}>
                      <Avatar
                        src=""
                        icon={<UserOutlined />}
                        style={{ width: "2.5em", height: "2.5em" }}
                      />
                      <div>
                        <h5>Joginder Singh</h5>
                        <p>gambol943@gmail.com</p>
                      </div>
                      {/* <Divider /> */}
                    </Flex>
                  </Space>
                  {React.cloneElement(menu, {
                    style: menuStyle,
                  })}
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src="" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </header>  
  );
}

export default Header;
