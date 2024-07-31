import React, { useState, useEffect } from "react";
import { Tabs, Card, Spin, Modal, Button, message } from "antd";
import "./donhang.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../../config/axios";
import Cookies from "js-cookie";
const { TabPane } = Tabs;

const Donhang = () => {
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersShipping, setOrdersShipping] = useState([]);
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const customerId = Cookies.get("customerId");

  useEffect(() => {
    const fetchOrdersByCustomer = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/orders/order-by-customer/${customerId}`
        );
        const orders = response.data || [];

        setOrdersPending(
          orders.filter((order) => order.status === "Chờ lấy hàng")
        );
        setOrdersShipping(
          orders.filter((order) => order.status === "Đang giao hàng")
        );
        setOrdersDelivered(
          orders.filter((order) => order.status === "Đã giao hàng")
        );
        setOrdersCancelled(orders.filter((order) => order.status === "Đã hủy"));
      } catch (error) {
        console.error(
          `Error fetching orders for customer ${customerId}:`,
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersByCustomer();
  }, [customerId]);

  const handleViewCartDetails = async (orderId) => {
    try {
      const response = await api.get(`/api/orderdetails/byorderid/${orderId}`);
      setCartDetails(response.data || []);
      setIsModalVisible(true);
    } catch (error) {
      console.error(
        `Error fetching order details for order ${orderId}:`,
        error
      );
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(`/api/orders/cancel/${orderId}`);
      message.success("Đơn hàng đã được hủy thành công.");

      const response = await api.get(
        `/api/orders/order-by-customer/${customerId}`
      );
      const orders = response.data || [];
      setOrdersPending(
        orders.filter((order) => order.status === "Chờ lấy hàng")
      );
      setOrdersShipping(
        orders.filter((order) => order.status === "Đang giao hàng")
      );
      setOrdersDelivered(
        orders.filter((order) => order.status === "Đã giao hàng")
      );
      setOrdersCancelled(orders.filter((order) => order.status === "Đã hủy"));
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      message.error("Đã xảy ra lỗi khi hủy đơn hàng.");
    } finally {
      setIsConfirmModalVisible(false);
    }
  };

  const showCancelConfirm = (orderId) => {
    setSelectedOrderId(orderId);
    setIsConfirmModalVisible(true);
  };

  const renderTable = (orders, title, isPending = false) => (
    <Card title={title} style={{ marginBottom: 20 }}>
      <Spin spinning={loading}>
        {orders.length === 0 ? (
          <div>Bạn chưa có sản phẩm trong giỏ hàng.</div>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell align="left">Thông tin đơn hàng</TableCell>
                  <TableCell align="left">Địa chỉ kho hàng</TableCell>
                  <TableCell align="left">Thông tin Shipper</TableCell>
                  <TableCell align="center">Tổng tiền</TableCell>
                  <TableCell align="center">Phương thức thanh toán</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {renderShippingAddress(order.shippingAddress)}
                    </TableCell>
                    <TableCell align="center">{order.storageName}</TableCell>
                    <TableCell>
                      <div>Tên: {order.deliveryName}</div>
                      <div>Số điện thoại: {order.deliveryPhone}</div>
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell align="center">{order.paymentMethod}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleViewCartDetails(order.orderId)}
                      >
                        Xem chi tiết
                      </Button>
                      {isPending && (
                        <Button
                          onClick={() => showCancelConfirm(order.orderId)}
                          danger
                          style={{ marginLeft: "10px" }}
                        >
                          Hủy đơn hàng
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Spin>
    </Card>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const renderShippingAddress = (shippingAddress) => {
    const [name, phone, address] = shippingAddress.split(" - ");
    return (
      <div>
        <div>Tên: {name}</div>
        <div>Số điện thoại: {phone}</div>
        <div>Địa chỉ: {address}</div>
      </div>
    );
  };

  return (
    <div className="profile-update">
      <Tabs defaultActiveKey="1" className="setting-tabs">
        <TabPane tab="Chờ lấy hàng" key="1">
          {renderTable(ordersPending, "Chờ lấy hàng", true)}
        </TabPane>
        <TabPane tab="Đang giao hàng" key="2">
          {renderTable(ordersShipping, "Đang giao hàng")}
        </TabPane>
        <TabPane tab="Đã giao hàng" key="3">
          {renderTable(ordersDelivered, "Đã giao hàng")}
        </TabPane>
        <TabPane tab="Đã huỷ" key="4">
          {renderTable(ordersCancelled, "Đã hủy")}
        </TabPane>
      </Tabs>

      <Modal
        title="Chi tiết giỏ hàng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="left">Số lượng</TableCell>
                <TableCell align="left">Giá</TableCell>
                <TableCell align="left">Giảm giá</TableCell>
                <TableCell align="left">Tổng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartDetails.map((item) => (
                <TableRow key={item.productItemID}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.itemName}
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell align="left">{item.discount}%</TableCell>
                  <TableCell align="left">
                    {formatCurrency(item.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>

      <Modal
        title="Xác nhận hủy đơn hàng"
        open={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsConfirmModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => handleCancelOrder(selectedOrderId)}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </div>
  );
};

export default Donhang;
