import React, { useEffect, useState } from "react";
import { Button, Divider, Typography, message } from "antd";
import {} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./CartTotal.scss";
import api from "../../config/axios";
import { setTotalInfo } from "../../Store/reduxReducer/cartSlice";

const { Title, Text } = Typography;

const CartTotal = ({ selectedItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart).products;
  const dispatch = useDispatch();

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedItems, carts]);

  const calculateTotalPrice = () => {
    if (!selectedItems || !Array.isArray(selectedItems) || !carts) {
      return;
    }

    const selected = carts.filter((item) =>
      selectedItems.includes(item.productItemId)
    );

    const total = selected.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const discount = selected.reduce((acc, item) => {
      const itemDiscount = (item.total - item.price) * (item.quantity || 1);

      return acc + itemDiscount;
    }, 0);

    setTotalPrice(total);
    setTotalDiscount(discount);
    dispatch(setTotalInfo({ total, discount }));
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.warning("Bạn chưa có sản phẩm cần thanh toán.");
      return;
    }

    const token = Cookies.get("token");

    if (token) {
      navigate("/thanh-toan");
    } else {
      message.warning("Bạn cần đăng nhập để thanh toán.");
      navigate("/sign-in");
    }
  };

  // const handleFormSubmit = (values) => {
  //   const { name, phone, address } = values;
  //   const shippingInfo = `${name}-${phone}-${address}`;
  //   const customerId = Cookies.get("customerId");
  //   const amount = totalPrice; // Assuming totalPrice is already defined in your component
  //   const xacnhan = "xac-nhan";
  //   api
  //     .get(
  //       `/api/payment/VNPay/${amount}/${xacnhan}/${shippingInfo}/${customerId}`
  //     )
  //     .then((response) => {
  //       message.success("Tiến hành thanh toán");

  //       const paymentUrl = response.data; // Assuming the API returns the payment URL in `response.data.paymentUrl`
  //       console.log(selectedItems);
  //       window.location.href = paymentUrl; // Redirect to the payment page
  //       dispatch(deleteSelectedItems(selectedItems));
  //     })
  //     .catch((error) => {
  //       console.error("Failed to process payment:", error);
  //       message.error("Failed to process payment. Please try again later.");
  //     });
  // };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="cart-total">
      <Title level={2}>Thanh toán</Title>
      <Divider />
      <div className="cart-total__detail">
        <div className="cart-total__item">
          <Text>Tính tạm</Text>
          <Text>{formatCurrency(totalPrice)}</Text>
        </div>
        <div className="cart-total__item">
          <Text>Giảm giá sản phẩm</Text>
          <Text style={{ color: "#ff469e" }}>
            {formatCurrency(totalDiscount)}
          </Text>
        </div>
        <Divider />
        <div className="cart-total__item cart-total__total">
          <Text strong>Tổng tiền</Text>
          <Text strong>{formatCurrency(totalPrice + totalDiscount)}</Text>
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
};

export default CartTotal;
