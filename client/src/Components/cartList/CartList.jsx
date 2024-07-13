import React, { useState } from "react";
import { Button, Input, List, message, Typography, Checkbox } from "antd";
import { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./CartList.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
  resetCart,
} from "../../Store/reduxReducer/cartSlice";

const { Title, Text } = Typography;

function CartList({ selectedItems, setSelectedItems }) {
  const carts = useSelector((state) => state.cart).products;
  const dispatch = useDispatch();

  const handleCheckboxChange = (productItemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productItemId)) {
        return prevSelectedItems.filter((id) => id !== productItemId);
      } else {
        return [...prevSelectedItems, productItemId];
      }
    });
  };
  // console.log("hê", carts.total);
  const handleIncreaseQuantity = (productItemId) => {
    dispatch(increaseQuantity({ productItemId }));
  };

  const handleDecreaseQuantity = (productItemId) => {
    dispatch(decreaseQuantity({ productItemId }));
  };

  const calculateTotal = (item) => {
    // Calculate total based on item price and quantity
    return item.total * item.quantity;
  };

  return (
    <div className="cart-list">
      <Title level={2}>Giỏ hàng của bạn</Title>
      {Array.isArray(carts) && carts.length === 0 ? (
        <p>Giỏ hàng của bạn trống</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={carts}
          renderItem={(item) => (
            <List.Item
              key={item.productItemId}
              actions={[
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => dispatch(deleteItem(item.productItemId))}
                />,
              ]}
            >
              <Checkbox
                // checked={selectedItems[item.productItemId]}
                onChange={() => handleCheckboxChange(item.productItemId)}
              />
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
                    {"   "}
                    {/* Display discount and adjusted price if applicable */}
                    {item.discount > 0 && (
                      <>
                        <Text type="danger">Giảm giá: {item.discount}%</Text>
                      </>
                    )}
                    <br />
                    <Text strong>{item.total} VNĐ</Text>
                    <div className="cart-item-quantity">
                      <span>Số lượng: </span>
                      <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={() =>
                          handleDecreaseQuantity(item.productItemId)
                        }
                      />
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        style={{ width: "50px", textAlign: "center" }}
                        readOnly
                      />

                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          handleIncreaseQuantity(item.productItemId)
                        }
                      />
                    </div>
                    <br />
                    <Text strong>Tổng tiền: {calculateTotal(item)} VNĐ</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
      <Button type="primary" danger onClick={() => dispatch(resetCart())}>
        Xóa hết giỏ hàng
      </Button>
    </div>
  );
}

export default CartList;
