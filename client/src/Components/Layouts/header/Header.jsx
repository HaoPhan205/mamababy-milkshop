import "./Header.scss";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";
import { Avatar, Badge, Button, Dropdown, Space, theme } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/action/authActions";
const { useToken } = theme;

function Header({ collapsed, toggleCollapsed }) {
  const { token } = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, role, photoURL } = useSelector((state) => state.auth);

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle = {
    boxShadow: "none",
  };

  const phoneNumber = "0354019580";

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/sign-in");
  };

  const handleShoppingCart = () => {
    navigate("/shoppingCart");
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          href={
            role === "instructor" ? "/admin-dashboard" : "/student-dashboard"
          }
        >
          Dashboard
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="/memberships">Thông tin tài khoản</a>,
    },
    {
      key: "3",
      label: <a href="/settings">Đơn mua</a>,
    },
    {
      key: "4",
      label: <a onClick={handleLogout}>Đăng xuất</a>,
    },
  ];

  return (
    <header className="header">
      <div className="header__logo">
        <Logo />
      </div>

      <div className="header__search">
        <input type="text" placeholder="Ba mẹ muốn tìm mua gì hôm nay ?" />
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
          {email ? (
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
                        src={photoURL || ""}
                        icon={<UserOutlined />}
                        style={{ width: "2.5em", height: "2.5em" }}
                      />
                      <div>
                        <h5>{email}</h5>
                      </div>
                    </div>
                  </Space>
                  {React.cloneElement(menu, {
                    style: menuStyle,
                  })}
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src={photoURL || ""} icon={<UserOutlined />} />
                </Space>
              </a>
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
