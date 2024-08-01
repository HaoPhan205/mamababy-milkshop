import React, { useState, useEffect } from "react";
import { Tabs, Card, Spin, Modal, Button, message, Select } from "antd";
import "./Quanlidonhang.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Cookies from "js-cookie";
import api from "../../../config/axios";

const { TabPane } = Tabs;
const { Option } = Select;

const Quanlidonhang = () => {
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersShipping, setOrdersShipping] = useState([]);
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [storages, setStorages] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    "Chờ lấy hàng",
    "Đang giao hàng",
    "Đã giao hàng",
    "Đã hủy",
  ]);
  const [selectedStorageId, setSelectedStorageId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

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

  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const response = await api.get(`/api/storage`);
        setStorages(response.data || []);
      } catch (error) {
        console.error("Error fetching storage data:", error);
      }
    };

    fetchStorages();
  }, []);

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/api/orders/update-status/${orderId}`, {
        status: newStatus,
      });
      message.success("Trạng thái đơn hàng đã được cập nhật thành công.");

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
      console.error(`Error updating status for order ${orderId}:`, error);
      message.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  const renderTable = (orders, title, isPending = false) => (
    <Card title={title} style={{ marginBottom: 20 }}>
      <Spin spinning={loading}>
        {orders.length === 0 ? (
          <div>Bạn chưa có đơn hàng nào.</div>
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
                  <TableCell align="center">Trạng thái</TableCell>
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
                    <TableCell align="center">
                      <Select
                        defaultValue={order.storageID}
                        style={{ width: 150 }}
                        // onChange={(value) =>
                        //   handleStorageChange(order.orderId, value)
                        // }
                      >
                        {storages.map((storage) => (
                          <Option
                            key={storage.storageID}
                            value={storage.storageID}
                          >
                            {storage.storageName}
                          </Option>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div>Tên: {order.deliveryName}</div>
                      <div>Số điện thoại: {order.deliveryPhone}</div>
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell align="center">{order.paymentMethod}</TableCell>
                    <TableCell align="center">
                      <Select
                        defaultValue={order.status}
                        style={{ width: 150 }}
                        onChange={(value) =>
                          handleStatusChange(order.orderId, value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <Option key={status} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        type="link"
                        onClick={() => handleViewCartDetails(order.orderId)}
                      >
                        Chi tiết giỏ hàng
                      </Button>
                      {isPending && (
                        <Button
                          type="link"
                          danger
                          onClick={() => showCancelConfirm(order.orderId)}
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

  const renderShippingAddress = (shippingAddress) => {
    if (!shippingAddress) {
      return "";
    }

    const { houseNumber, street, ward, district, city } = shippingAddress;

    return `${houseNumber}, ${street}, ${ward}, ${district}, ${city}`;
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="order-management">
      <Tabs defaultActiveKey="1" className="order-tabs">
        <TabPane tab="Chờ lấy hàng" key="1">
          {renderTable(ordersPending, "Đơn hàng đang chờ lấy hàng", true)}
        </TabPane>
        <TabPane tab="Đang giao hàng" key="2">
          {renderTable(ordersShipping, "Đơn hàng đang giao")}
        </TabPane>
        <TabPane tab="Đã giao hàng" key="3">
          {renderTable(ordersDelivered, "Đơn hàng đã giao")}
        </TabPane>
        <TabPane tab="Đã hủy" key="4">
          {renderTable(ordersCancelled, "Đơn hàng đã hủy")}
        </TabPane>
      </Tabs>

      <Modal
        title="Chi tiết giỏ hàng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Tổng cộng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartDetails.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>

      <Modal
        title="Xác nhận hủy đơn hàng"
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsConfirmModalVisible(false)}>
            Không
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger
            onClick={() => handleCancelOrder(selectedOrderId)}
          >
            Có
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </div>
  );
};

export default Quanlidonhang;
