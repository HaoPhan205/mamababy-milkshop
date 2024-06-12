import React from "react";
import logo from "../../Assets/lernerra.png";
import "./Logo.scss";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/" className="wrapper-black">
        <img src={logo} className="wrapper-black__logo" />
      </Link>
    </div>
  );
}

export default Logo;
