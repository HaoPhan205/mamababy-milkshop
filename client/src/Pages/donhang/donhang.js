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

const { TabPane } = Tabs;

const Donhang = () => {
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersShipping, setOrdersShipping] = useState([]);
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [loadingDelivered, setLoadingDelivered] = useState(false);
  const [loadingCancelled, setLoadingCancelled] = useState(false);

  useEffect(() => {
    const fetchOrdersByStatus = async (status, setter, setLoadingState) => {
      setLoadingState(true);
      try {
        const response = await api.get(`/orderdetails/status/${status}`);
        setter(response.data);
      } catch (error) {
        console.error(`Error fetching orders with status ${status}:`, error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchOrdersByStatus("pending", setOrdersPending, setLoadingPending);
    fetchOrdersByStatus("shipping", setOrdersShipping, setLoadingShipping);
    fetchOrdersByStatus("delivered", setOrdersDelivered, setLoadingDelivered);
    fetchOrdersByStatus("cancelled", setOrdersCancelled, setLoadingCancelled);
  }, []);

  const makeStyle = (status) => {
    switch (status) {
      case "approved":
        return {
          background: "rgb(145 254 159 / 47%)",
          color: "green",
        };
      case "pending":
        return {
          background: "#ffadad8f",
          color: "red",
        };
      case "delivered":
        return {
          background: "#59bfff",
          color: "white",
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
                <TableCell>Hình ảnh</TableCell>
                <TableCell align="left">Sản phẩm</TableCell>
                <TableCell align="left">Số lượng</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="left">Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.trackingId}>
                  <TableCell>
                    <img
                      src={order.image}
                      alt="Product"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>{order.itemName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <span
                      className="status"
                      style={makeStyle(order.orderStatus)}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
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
        <TabPane tab="Chờ giao hàng" key="2">
          {renderTable(ordersShipping, loadingShipping, "Chờ giao hàng")}
        </TabPane>
        <TabPane tab="Đã giao" key="3">
          {renderTable(ordersDelivered, loadingDelivered, "Đã giao")}
        </TabPane>
        <TabPane tab="Đã huỷ" key="4">
          {renderTable(ordersCancelled, loadingCancelled, "Đã huỷ")}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Donhang;
