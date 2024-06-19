import "./Header.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";
import { Link } from "react-router-dom";

import { Badge, Button } from "antd";
import React, { useState } from "react";

import { SignOut } from "../../signout/SignOut";
import { useUsers } from "../../../Hooks/useUsers";

function Header({ collapsed, toggleCollapsed }) {
  const { getCurrUser } = useUsers();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { onLogIn } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await onLogIn(username, password);
    setLoading(false);
  };

  const menuStyle = {
    boxShadow: "none",
  };

  const phoneNumber = "0354019580";

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
          <ShoppingCartOutlined style={{ fontSize: "2em" }} />
        </Badge>

        {!getCurrUser() ? (
          <div className="header__signin" aria-label="Authentication Options">
            <Button variant="text">
              <Link to="/sign-in">Đăng nhập</Link>
            </Button>
          </div>
        ) : (
          <nav className="user" aria-label="User account">
            <span
              className="welcome"
              aria-label={`Logged in as ${getCurrUser().username}`}
            >
              <div>[{getCurrUser().username}]</div>
              <SignOut />
            </span>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
