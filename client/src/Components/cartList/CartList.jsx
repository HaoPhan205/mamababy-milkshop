import React, { useState } from "react";
import {
  Button,
  Input,
  List,
  Typography,
  Checkbox,
  Row,
  Col,
  Divider,
  Modal,
} from "antd";
import { PlusOutlined, MinusOutlined, ClearOutlined } from "@ant-design/icons";
import "./CartList.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
  resetCart,
  updateQuantity,
} from "../../Store/reduxReducer/cartSlice";
import close from "../../Assets/deleted.png";

const { Text } = Typography;

function CartList({ selectedItems, setSelectedItems }) {
  const carts = useSelector((state) => state.cart).products;
  const dispatch = useDispatch();
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleCheckboxChange = (productItemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productItemId)) {
        return prevSelectedItems.filter((id) => id !== productItemId);
      } else {
        return [...prevSelectedItems, productItemId];
      }
    });
  };

  const handleIncreaseQuantity = (productItemId) => {
    dispatch(increaseQuantity({ productItemId }));
  };

  const handleDecreaseQuantity = (productItemId) => {
    dispatch(decreaseQuantity({ productItemId }));
  };

  const calculateTotal = (item) => {
    return item.total * item.quantity;
  };

  const handleQuantityChange = (productItemId, newQuantity) => {
    const quantity = newQuantity === "" ? 0 : parseInt(newQuantity, 10);
    dispatch(updateQuantity({ productItemId, quantity }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const showDeleteConfirm = (productItemId) => {
    setDeleteItemId(productItemId);
    setDeleteConfirmVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmVisible(false);
    setDeleteItemId(null);
  };

  const handleDeleteOk = () => {
    if (deleteItemId) {
      dispatch(deleteItem(deleteItemId));
      setDeleteItemId(null);
    }
    setDeleteConfirmVisible(false);
  };

  return (
    <div className="cart-list">
      {/* <Title level={2}>Giỏ hàng của bạn</Title> */}
      {Array.isArray(carts) && carts.length === 0 ? (
        <p>Giỏ hàng của bạn trống</p>
      ) : (
        <>
          <Row className="cart-list-header" gutter={[16, 16]}>
            <Col span={1}></Col>
            <Col style={{ fontSize: 20 }} span={7}>
              Giỏ hàng của bạn
            </Col>

            <Col span={2}>{/* <Text strong>Tên sản phẩm</Text> */}</Col>
            <Col span={4} className="center-content">
              <Text strong>Đơn giá</Text>
            </Col>
            <Col span={4} className="center-content">
              <Text strong>Số lượng</Text>
            </Col>
            <Col span={4} className="center-content">
              <Text strong>Thành tiền</Text>
            </Col>
            <Col span={2} className="center-content">
              {/* Delete button header */}
            </Col>
          </Row>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={carts}
            renderItem={(item) => (
              <List.Item key={item.productItemId} className="cart-item">
                <Row gutter={[16, 16]}>
                  <Col span={1} className="center-content">
                    <Checkbox
                      onChange={() => handleCheckboxChange(item.productItemId)}
                    />
                  </Col>
                  <Col span={4} className="center-content">
                    <img
                      src={item.image1}
                      alt={item.itemName}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={5} className="itemName">
                    <Text strong>{item.itemName}</Text>
                  </Col>
                  <Col span={4} className="center-content">
                    <div className="price-container">
                      <Text className="total-text">
                        {formatCurrency(item.total)}
                      </Text>
                      <br />
                      <Text className="price-text" delete>
                        {formatCurrency(item.price)}
                      </Text>
                      {item.discount > 0 && (
                        <Text type="danger" className="discount-text">
                          -{item.discount}%
                        </Text>
                      )}
                    </div>
                  </Col>
                  <Col span={4} className="center-content">
                    <div className="cart-item-quantity">
                      <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={() =>
                          handleDecreaseQuantity(item.productItemId)
                        }
                        className="quantity"
                      />
                      <Input
                        className="quantity-input"
                        type="text"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productItemId,
                            e.target.value
                          )
                        }
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          handleIncreaseQuantity(item.productItemId)
                        }
                        className="quantity"
                      />
                    </div>
                  </Col>
                  <Col span={4} className="center-content">
                    <Text style={{ fontSize: "16px" }}>
                      {formatCurrency(calculateTotal(item))}
                    </Text>
                  </Col>
                  <Col span={2} className="center-content">
                    <img
                      src={close}
                      className="center-content close"
                      alt="Close"
                      onClick={() => showDeleteConfirm(item.productItemId)}
                      // onClick={() => dispatch(deleteItem(item.productItemId))}
                    ></img>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <div className="clearCart">
            {carts.length > 1 && (
              <Button
                type="primary"
                danger
                onClick={() => dispatch(resetCart())}
              >
                <ClearOutlined /> Xóa hết giỏ hàng
              </Button>
            )}
          </div>
        </>
      )}
      <Modal
        title="Xác nhận xoá sản phẩm"
        visible={deleteConfirmVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
        style={{ textAlign: "center" }}
      >
        <Row justify="center">
          <Col span={24}>
            <p style={{ textAlign: "center" }}>
              Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?
            </p>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default CartList;
