import "./Header.scss";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";
import { Avatar, Badge, Button, Dropdown, Space } from "antd";
import React, { useState } from "react";

function Header({ collapsed, toggleCollapsed }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRedirect, setSearchRedirect] = useState(false);

  const contentStyle = {
    // Define your content style if needed
  };

  const menuStyle = {
    // Define your menu style if needed
  };

  const phoneNumber = "0354019580";

  const handleLogout = async () => {
    // Implement your logout logic here
    navigate("/sign-in");
  };

  const handleShoppingCart = () => {
    navigate("/shoppingCart");
  };

  const handleSearch = () => {
    setSearchRedirect(true);
  };

  const items = [
    {
      key: "1",
      label: <a href="/user-dashboard">Dashboard</a>,
    },
    {
      key: "2",
      label: <a href="/thongtin">Thông tin tài khoản</a>,
    },
    {
      key: "3",
      label: <a href="/settings">Đơn mua</a>,
    },
    {
      key: "4",
      label: (
        <button
          onClick={handleLogout}
          style={{
            all: "unset",
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Đăng xuất
        </button>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="header__logo">
        <Logo />
      </div>

      <div className="header__search">
        <input
          type="text"
          placeholder="Ba mẹ muốn tìm mua gì hôm nay ?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          addonAfter={
            <SearchOutlined
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
            />
          }
        />
      </div>
      <div className="header__free">
        <p>
          Mua hàng và CSKH:{" "}
          <a href={`tel:${phoneNumber}`} className="header__phone">
            {phoneNumber}
          </a>
        </p>
        <img src={free} alt="" className="header__freeIcon" />
      </div>
      <div className="header__right">
        <Badge count={1}>
          <ShoppingCartOutlined
            style={{ fontSize: "2em" }}
            onClick={handleShoppingCart}
          />
        </Badge>
        <div className="header__signin" aria-label="Authentication Options">
          {/* Example of conditional rendering based on authentication */}
          {/* Replace with your authentication logic */}
          {false ? (
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                      }}
                    >
                      <Avatar
                        src=""
                        icon={<UserOutlined />}
                        style={{ width: "2.5em", height: "2.5em" }}
                      />
                      <div>
                        <h5>{""}</h5>
                      </div>
                    </div>
                  </Space>
                  {React.cloneElement(menu, {
                    style: menuStyle,
                  })}
                </div>
              )}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{
                  background: "none",
                  color: "inherit",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  cursor: "pointer",
                }}
              >
                <Space>
                  <Avatar src={""} icon={<UserOutlined />} />
                </Space>
              </button>
            </Dropdown>
          ) : (
            <Button
              className="header__signin"
              type="primary"
              danger
              style={{ background: "#ff469e" }}
              onClick={() => navigate("/sign-in")}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
