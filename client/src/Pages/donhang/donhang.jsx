import React, { useState, useEffect } from "react";
import { Tabs, Card, Spin } from "antd";
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

const Donhang = ({ customerId }) => {
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersShipping, setOrdersShipping] = useState([]);
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [loadingDelivered, setLoadingDelivered] = useState(false);
  const [loadingCancelled, setLoadingCancelled] = useState(false);

  useEffect(() => {
    const fetchOrdersByStatus = async (status) => {
      try {
        const response = await api.get(`/api/orders/1`);
        console.log("data", response);
        switch (status) {
          case "Chờ lấy hàng":
            setOrdersPending(response.data || []);
            setLoadingPending(false);
            break;
          case "Đang giao hàng":
            setOrdersShipping(response.data || []);
            setLoadingShipping(false);
            break;
          case "Đã giao hàng":
            setOrdersDelivered(response.data || []);
            setLoadingDelivered(false);
            break;
          case "Đã hủy":
            setOrdersCancelled(response.data || []);
            setLoadingCancelled(false);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching orders with status ${status}:`, error);
      }
    };
    // console.log("hello");
    setLoadingPending(true);
    setLoadingShipping(true);
    setLoadingDelivered(true);
    setLoadingCancelled(true);

    fetchOrdersByStatus("Chờ lấy hàng");
    fetchOrdersByStatus("Đang giao hàng");
    fetchOrdersByStatus("Đã giao hàng");
    fetchOrdersByStatus("Đã hủy");
  }, []);

  const makeStyle = (status) => {
    switch (status) {
      case "Chờ lấy hàng":
        return {
          background: "#ffadad8f",
          color: "red",
        };
      case "Đang giao hàng":
        return {
          background: "#ffd7008f",
          color: "orange",
        };
      case "Đã giao hàng":
        return {
          background: "#59bfff",
          color: "white",
        };
      case "Đã hủy":
        return {
          background: "#d3d3d3",
          color: "gray",
        };
      default:
        return {
          background: "transparent",
          color: "black",
        };
    }
  };

  const renderTable = (orders, loadingState, title) => (
    <Card title={title} style={{ marginBottom: 20 }}>
      <Spin spinning={loadingState}>
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
                <TableCell align="left">Tổng tiền</TableCell>
                <TableCell align="left">Phương thức thanh toán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                  <TableCell>{order.storageName}</TableCell>
                  <TableCell>
                    <div>{order.deliveryName}</div>
                    <div>{order.deliveryPhone}</div>
                  </TableCell>
                  <TableCell>
                    {order.totalAmount.toLocaleString()} VNĐ
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Spin>
    </Card>
  );

  return (
    <div className="profile-update">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Chờ lấy hàng" key="1">
          {renderTable(ordersPending, loadingPending, "Chờ lấy hàng")}
        </TabPane>
        <TabPane tab="Đang giao hàng" key="2">
          {renderTable(ordersShipping, loadingShipping, "Đang giao hàng")}
        </TabPane>
        <TabPane tab="Đã giao" key="3">
          {renderTable(ordersDelivered, loadingDelivered, "Đã giao hàng")}
        </TabPane>
        <TabPane tab="Đã huỷ" key="4">
          {renderTable(ordersCancelled, loadingCancelled, "Đã hủy")}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Donhang;
