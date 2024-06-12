import React from "react";
import logo from "../../Assets/LOGO.png";
import "./Logo.scss";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/" className="wrapper-black">
        <img src={logo} className="wrapper-black__logo" alt="Logo" />
      </Link>
    </div>
  );
}

export default Logo;
