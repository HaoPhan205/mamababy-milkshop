import React, { useEffect, useState } from "react";
import { Button, Input, List, message, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./CartList.scss";

const { Title, Text } = Typography;

function CartList() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (productItemId) => {
    // Xóa sản phẩm khỏi giỏ hàng
    const updatedCart = cartItems.filter(
      (item) => item.productItemId !== productItemId
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    message.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  const updateQuantity = (productItemId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productItemId === productItemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-list">
      <Title level={2}>Giỏ hàng của bạn</Title>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn trống</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => removeFromCart(item.productItemId)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={item.image1}
                    alt={item.itemName}
                    style={{ width: 100 }}
                  />
                }
                title={<Text strong>{item.itemName}</Text>}
                description={
                  <div>
                    <Text>Giá: {item.price} VNĐ</Text>
                    <div className="cart-item-quantity">
                      <span>Số lượng: </span>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          updateQuantity(
                            item.productItemId,
                            parseInt(e.target.value, 10)
                          )
                        }
                        style={{ width: "50px", marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default CartList;
