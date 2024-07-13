import "./Header.scss";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";
import { Avatar, Badge, Button, Dropdown, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUsers } from "../../../Services/Hooks/useUsers";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function Header({ collapsed, toggleCollapsed }) {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { getCurrUser, onLogOut } = useUsers();
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleLogout = async () => {
    onLogOut();
  };

  const handleShoppingCart = () => {
    navigate("/shoppingCart");
  };

  useEffect(() => {
    fetchCartQuantity();
  }, []);

  const fetchCartQuantity = () => {
    const customerID = Cookies.get("customerId");

    if (customerID) {
      api
        .get(`/api/orderdetails/productquantityincart?customerID=${customerID}`)
        .then((res) => {
          if (res.data && res.data.productItemCount) {
            setCartQuantity(res.data.productItemCount);
          } else {
            setCartQuantity(0);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch cart quantity:", error);
          message.error(
            "Failed to fetch cart quantity. Please try again later."
          );
        });
    } else {
      setCartQuantity(0);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      message.warning("Vui lòng nhập từ khóa tìm kiếm");
      return;
    }

    try {
      const response = await api.get(`/api/productitems/search`, {
        params: { query: searchTerm },
      });

      if (response.data && response.data.length > 0) {
        navigate("/cua-hang", { state: { products: response.data } });
      } else {
        message.warning("Không tìm thấy sản phẩm nào");
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  const phoneNumber = "0354019580";

  const items = [
    // {
    //   key: "1",
    //   label: <a href="/user-dashboard">Dashboard</a>,
    // },
    // {
    //   key: "2",
    //   label: <a href="/thongtin">Thông tin tài khoản</a>,
    // },
    // {
    //   key: "3",
    //   label: <a href="/settings">Đơn mua</a>,
    // },
    {
      key: "1",
      label: (
        <button
          onClick={handleLogout}
          style={{
            all: "unset",
            cursor: "pointer",
            color: "black",
            textDecoration: "none",
          }}
        >
          Đăng xuất
        </button>
      ),
    },
  ];

  const currentUser = getCurrUser();

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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <SearchOutlined
          onClick={handleSearch}
          style={{ cursor: "pointer", fontSize: "1.5em", marginLeft: "0.5em" }}
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
        <Badge count={totalQuantity}>
          <ShoppingCartOutlined
            style={{ fontSize: "2em" }}
            onClick={handleShoppingCart}
          />
        </Badge>
        <div className="header__signin" aria-label="Authentication Options">
          {currentUser ? (
            <Dropdown
              menu={{
                items,
              }}
              dropdownRender={(menu) => (
                <div>
                  <Space
                    style={{
                      // padding: 8,
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
                      {/* <Avatar
                        src=""
                        icon={<UserOutlined />}
                        style={{ width: "2em", height: "2em" }}
                      /> */}
                      <div>
                        <h5>{currentUser.customerName}</h5>
                      </div>
                    </div>
                  </Space>
                  {React.cloneElement(menu, {})}
                </div>
              )}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{
                  background: "#ff469e",
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
