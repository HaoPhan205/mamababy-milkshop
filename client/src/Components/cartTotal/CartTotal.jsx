import React, { useEffect, useState } from "react";
import { Button, Divider, Typography } from "antd";
import "./CartTotal.scss";

const { Title, Text } = Typography;

function CartTotal() {
  const [cartItems, setCartItems] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Tính toán tổng tiền
    const original = storedCart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    const discount = 0; // Ví dụ giảm giá cố định
    const total = original - discount;

    setOriginalPrice(original);
    setDiscountPrice(discount);
    setTotalPrice(total);
  }, []);

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
        <Button type="primary" className="cart-total__checkout">
          Thanh toán ngay
        </Button>
      </div>
    </div>
  );
}

export default CartTotal;
