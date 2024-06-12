import React from "react";
import "./SignIn.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="signIn">
      <Button variant="text">
        <Link to="/sign-in" style={{ color: "black" }}>
          Đăng nhập
        </Link>
      </Button>
    </div>
  );
}

export default SignIn;
