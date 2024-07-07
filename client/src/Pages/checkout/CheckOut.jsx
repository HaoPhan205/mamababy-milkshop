import React from "react";
import { Layout, Breadcrumb, Menu } from "antd";
import BillingForm from "../../Components/billingForm/BillingForm";
import OrderForm from "../../Components/orderForm/OrderForm";
import PaymentForm from "../../Components/paymentMethod/PaymentForm";
import "./CheckOut.scss";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const CheckOut = () => {
  return (
    <div className="check">
      <Link
        style={{
          color: "black",
        }}
        to="/"
      >
        Home
      </Link>
      <h>/</h>
      <Link
        style={{
          color: "black",
        }}
        to="/shoppingCart"
      >
        Shopping Cart
      </Link>
      <h>/</h>
      <Link
        style={{
          color: "black",
        }}
      >
        Check Out
      </Link>
      <div className="site-layout-content"></div>
      <div className="content-wrapper">
        <div className="billing-and-payment">
          <BillingForm />
          <PaymentForm />
        </div>
        <OrderForm />
      </div>
    </div>
  );
};

export default CheckOut;
