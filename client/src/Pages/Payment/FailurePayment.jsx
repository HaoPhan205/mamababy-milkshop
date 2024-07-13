import React from "react";
import { Result, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const FailurePayment = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleBackToCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <Result
      status="error"
      icon={<CloseCircleOutlined />}
      title="Thanh toán thất bại!"
      subTitle="Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau."
      extra={[
        <Button type="primary" onClick={handleBackToHome} key="home">
          Về trang chủ
        </Button>,
        <Button onClick={handleBackToCart} key="cart">
          Quay lại giỏ hàng
        </Button>,
      ]}
    />
  );
};

export default FailurePayment;
