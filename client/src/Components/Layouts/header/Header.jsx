import "./Header.scss";
import {
  ShoppingCartOutlined,
  UserOutlined,
  // SearchOutlined,
} from "@ant-design/icons";

import { useNavigate, Link } from "react-router-dom";
import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";
import { Avatar, Badge, Button, Dropdown, Space, Typography } from "antd";
import React from "react";
import { useUsers } from "../../../Services/Hooks/useUsers";
import { useSelector } from "react-redux";
const { Text } = Typography;

function Header({ collapsed, toggleCollapsed }) {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const { getCurrUser, onLogOut } = useUsers();

  const handleLogout = async () => {
    onLogOut();
  };

  const handleShoppingCart = () => {
    navigate("/shoppingCart");
  };

  // useEffect(() => {
  //   fetchCartQuantity();
  // }, []);

  // const fetchCartQuantity = () => {
  //   const customerID = Cookies.get("customerId");

  //   if (customerID) {
  //     api
  //       .get(`/api/orderdetails/productquantityincart?customerID=${customerID}`)
  //       .then((res) => {
  //         if (res.data && res.data.productItemCount) {
  //           setCartQuantity(res.data.productItemCount);
  //         } else {
  //           setCartQuantity(0);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch cart quantity:", error);
  //         message.error(
  //           "Failed to fetch cart quantity. Please try again later."
  //         );
  //       });
  //   } else {
  //     setCartQuantity(0);
  //   }
  // };

  // const handleSearch = () => {
  //   if (searchTerm.trim() === "") {
  //     message.warning("Vui lòng nhập từ khóa tìm kiếm");
  //     return;
  //   }
  //   navigate(`/cua-hang?query=${searchTerm}`);
  // };

  const phoneNumber = "0354019580";

  const items = [
    // {
    //   key: "1",
    //   label: <a href="/user-dashboard">Dashboard</a>,
    // },
    {
      key: "1",
      label: <a href="/thongtin">Thông tin tài khoản</a>,
    },
    {
      key: "2",
      label: <a href="/don-hang-cua-ban">Thông tin đơn hàng</a>,
    },
    {
      key: "3",
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

      {/* <Search
        className="header__search"
        placeholder="Ba mẹ muốn tìm mua gì hôm nay?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
        enterButton
        style={{
          cursor: "pointer",
          fontSize: "1.5em",
          borderWidth: "2px",
          color: "#ff469e",
        }}
      /> */}

      <nav className="header__nav">
        <Text className="header__nav-item" onClick={() => navigate("/")}>
          Trang chủ
        </Text>
        <Text
          className="header__nav-item"
          onClick={() => navigate("/cua-hang")}
        >
          Cửa hàng
        </Text>
      </nav>

      <div className="header__free">
        <Text className="header__free_title">
          Mua hàng và CSKH:{" "}
          <a
            href={`tel:${phoneNumber}`}
            className="header__phone"
            style={{ color: "#ff469e" }}
          >
            {phoneNumber}
          </a>
        </Text>
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
