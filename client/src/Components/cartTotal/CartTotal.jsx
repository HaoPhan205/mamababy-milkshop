import React, { useEffect, useState, useContext } from "react";
import { Button, Divider, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./CartTotal.scss";
import api from "../../config/axios";

const { Title, Text } = Typography;

function CartTotal({ totalPriceProp }) {
  const [cartItems, setCartItems] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate total price
    const original = storedCart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    const discount = 0; // Example fixed discount
    const total = original - discount;

    setOriginalPrice(original);
    setDiscountPrice(discount);
    setTotalPrice(total); // Set total price in local state

    // Also update the parent component's state
    if (totalPriceProp) {
      totalPriceProp(total);
    }
  }, [totalPriceProp]);

  const handleCheckout = async () => {
    // Check if "token" cookie exists
    if (Cookies.get("token")) {
      try {
        const paymentResponse = await api.get(
          `/api/VNPay/payment/${totalPrice}/${1}`
        );
        const paymentLink = paymentResponse.data.paymentLink;
        window.location.href = paymentLink;
      } catch (error) {
        console.error("Error submitting payment:", error);
        message.error("Failed to initiate payment. Please try again later.");
      }
    } else {
      alert("Bạn cần đăng nhập để thanh toán.");
    }
  };

  return (
    <div className="cart-total">
      <Title level={2}>Tổng tiền</Title>
      <Divider />
      <div className="cart-total__detail">
        <div className="cart-total__item">
          <Text>Giá gốc</Text>
          <Text>{originalPrice} VNĐ</Text>
        </div>
        <div className="cart-total__item">
          <Text>Giảm giá</Text>
          <Text>{discountPrice} VNĐ</Text>
        </div>
        <Divider />
        <div className="cart-total__item cart-total__total">
          <Text strong>Tổng cộng</Text>
          <Text strong>{totalPrice} VNĐ</Text>
        </div>
        <Button
          type="primary"
          className="cart-total__checkout"
          onClick={handleCheckout}
        >
          Thanh toán ngay
        </Button>
      </div>
    </div>
  );
}

export default CartTotal;
