import React from "react";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleBackToShip = () => {
    navigate("/don-hang-cua-ban"); // Navigate to the cart page
  };

  return (
    <Result
      style={{ margin: "30px 0" }}
      icon={<SmileOutlined />}
      title="Thanh toán thành công!"
      subTitle="Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận."
      extra={[
        <Button type="primary" onClick={handleBackToHome}>
          Về trang chủ
        </Button>,

        <Button onClick={handleBackToShip} key="don-hang-cua-ban">
          Theo dõi đơn hàng
        </Button>,
      ]}
    />
  );
};

export default SuccessPayment;
