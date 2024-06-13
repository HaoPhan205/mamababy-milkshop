import "./Header.scss";
import {
  SearchOutlined,
  MailOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";
import { Link } from "react-router-dom";

import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Layout,
  Space,
  theme,
} from "antd";
import React, { useState } from "react";
import SideBar from "../../sidebar/SideBar";
import SignIn from "../../signin/SignIn";
import SignUp from "../../signup/SignUp";
import { SignOut } from "../../signout/SignOut";
import { useUsers } from "../../../Hooks/useUsers";

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

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
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
          <ShoppingCartOutlined style={{ fontSize: "1.5em" }} />
        </Badge>
        <Badge count={1}>
          <MailOutlined style={{ fontSize: "1.5em" }} />
        </Badge>
        <Badge count={1}>
          <BellOutlined style={{ fontSize: "1.5em" }} />
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
