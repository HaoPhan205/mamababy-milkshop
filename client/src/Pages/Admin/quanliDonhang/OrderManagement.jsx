import React, { useState, useEffect } from "react";
import {
  Tabs,
  Card,
  Spin,
  Modal,
  Button,
  message,
  Input,
  Pagination,
  Dropdown,
  Menu,
} from "antd";
import "./OrderManagement.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../../../config/axios";
import { format } from "date-fns";

const { TabPane } = Tabs;
const { Search } = Input;

const OrderManagement = () => {
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersShipping, setOrdersShipping] = useState([]);
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState("1");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });
  const [storages, setStorages] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedStorageId, setSelectedStorageId] = useState(null);
  const [selectedDeliveryManId, setSelectedDeliveryManId] = useState(null);

  useEffect(() => {
    const fetchOrdersByCustomer = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/orders");
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
        message.error("Đã xảy ra lỗi khi tải đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersByCustomer();
  }, []);

  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const response = await api.get("/api/storage");
        setStorages(response.data || []);
      } catch (error) {
        console.error("Error fetching storages:", error);
      }
    };

    fetchStorages();
  }, []);

  useEffect(() => {
    if (selectedStorageId !== null) {
      const fetchDeliveryMen = async () => {
        try {
          const response = await api.get(
            `/api/deliverymans/bystorageid/${selectedStorageId}`
          );
          setDeliveryMen(response.data || []);
        } catch (error) {
          console.error(
            `Error fetching delivery men for storage ${selectedStorageId}:`,
            error
          );
        }
      };

      fetchDeliveryMen();
    }
  }, [selectedStorageId]);

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

  const handleStatusChange = async (status) => {
    try {
      let apiUrl;
      switch (status) {
        case "Huỷ":
          apiUrl = `/api/orders/cancel/${selectedOrderId}`;
          break;
        case "Đang giao hàng":
          apiUrl = `/api/orders/${selectedOrderId}/status/delivering`;
          break;
        case "Đã giao hàng":
          apiUrl = `/api/orders/${selectedOrderId}/status/delivered`;
          break;
        default:
          throw new Error("Trạng thái không hợp lệ");
      }
      await api.put(apiUrl);
      message.success(
        `Đơn hàng đã được cập nhật trạng thái ${status} thành công.`
      );

      const response = await api.get(`/api/orders`);
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
      console.error(`Error updating order ${selectedOrderId}:`, error);
      message.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.");
    } finally {
      setIsConfirmModalVisible(false);
    }
  };

  const showStatusDropdown = (orderId, currentStatus) => {
    setSelectedOrderId(orderId);
    setCurrentStatus(currentStatus);
  };

  const handleMenuClick = (e) => {
    handleStatusChange(e.key);
  };

  const statusMenu = (
    <Menu onClick={handleMenuClick}>
      {currentTab === "2" ? (
        <>
          <Menu.Item key="Đã giao hàng">Đã giao hàng</Menu.Item>
          <Menu.Item key="Huỷ">Huỷ</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="Huỷ">Huỷ</Menu.Item>
          <Menu.Item key="Đang giao hàng">Đang giao hàng</Menu.Item>
          <Menu.Item key="Đã giao hàng">Đã giao hàng</Menu.Item>
        </>
      )}
    </Menu>
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filterOrders = (orders) => {
    return orders.filter(
      (order) =>
        order.orderId.toString().includes(searchText) ||
        order.shippingAddress.includes(searchText) ||
        order.deliveryName.includes(searchText)
    );
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({
      current: page,
      pageSize,
    });
  };

  const handleStorageChange = async ({ key }) => {
    setSelectedStorageId(key);
    await updateOrder(selectedOrderId, { storageId: key });
  };

  const handleDeliveryManChange = async ({ key }) => {
    setSelectedDeliveryManId(key);
    await updateOrder(selectedOrderId, { deliveryManId: key });
  };

  const updateOrder = async (orderId, updateData) => {
    try {
      const order =
        ordersPending.find((order) => order.orderId === orderId) ||
        ordersShipping.find((order) => order.orderId === orderId);
      if (order) {
        const updatedOrder = { ...order, ...updateData };
        await api.put(`/api/orders/${orderId}`, updatedOrder);
        message.success("Cập nhật đơn hàng thành công.");
      }
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      message.error("Đã xảy ra lỗi khi cập nhật đơn hàng.");
    }
  };

  const storageMenu = (
    <Menu onClick={handleStorageChange}>
      {storages.map((storage) => (
        <Menu.Item key={storage.storageID}>{storage.storageName}</Menu.Item>
      ))}
    </Menu>
  );

  const deliveryManMenu = (
    <Menu onClick={handleDeliveryManChange}>
      {deliveryMen.map((deliveryMan) => (
        <Menu.Item key={deliveryMan.deliveryManId}>
          {deliveryMan.deliveryName}
        </Menu.Item>
      ))}
    </Menu>
  );

  const renderTable = (orders, title, isPending = false) => {
    const filteredOrders = filterOrders(orders);
    const paginatedOrders = filteredOrders.slice(
      (pagination.current - 1) * pagination.pageSize,
      pagination.current * pagination.pageSize
    );
    const renderShippingAddress = (shippingAddress) => {
      if (!shippingAddress) return null;
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
      <Card title={title} style={{ marginBottom: 20 }}>
        <Spin spinning={loading}>
          <Search
            placeholder="Tìm kiếm đơn hàng"
            onChange={handleSearch}
            style={{ marginBottom: 16 }}
          />
          {filteredOrders.length === 0 ? (
            <div>Bạn chưa có sản phẩm.</div>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                className="table-smalll"
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Thời gian</TableCell>
                      <TableCell align="left">Thông tin đơn hàng</TableCell>
                      <TableCell align="left">Địa chỉ kho hàng</TableCell>
                      <TableCell align="left">Thông tin Shipper</TableCell>
                      <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedOrders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell>
                          {format(
                            new Date(order.orderDate),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </TableCell>
                        <TableCell>
                          {renderShippingAddress(order.shippingAddress)}
                          Phương thức thanh toán: {order.paymentMethod}
                          <br />
                          Tổng tiền: {formatCurrency(order.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <Dropdown overlay={storageMenu} trigger={["click"]}>
                            <Button>
                              {storages.find(
                                (storage) =>
                                  storage.storageID === order.storageID
                              )?.storageName || "Chọn kho hàng"}
                            </Button>
                          </Dropdown>
                        </TableCell>
                        <TableCell>
                          {isPending ? (
                            <Dropdown
                              overlay={deliveryManMenu}
                              trigger={["click"]}
                            >
                              <Button>
                                {deliveryMen.find(
                                  (deliveryMan) =>
                                    deliveryMan.deliveryManId ===
                                    order.deliveryManId
                                )?.deliveryName || "Chọn shipper"}
                              </Button>
                            </Dropdown>
                          ) : (
                            order.deliveryName
                          )}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            onClick={() => handleViewCartDetails(order.orderId)}
                          >
                            Xem chi tiết
                          </Button>
                          {isPending && (
                            <Dropdown overlay={statusMenu} trigger={["click"]}>
                              <Button
                                onClick={() =>
                                  showStatusDropdown(
                                    order.orderId,
                                    order.status
                                  )
                                }
                              >
                                Thay đổi trạng thái
                              </Button>
                            </Dropdown>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={filteredOrders.length}
                onChange={handlePaginationChange}
                className="pagi"
              />
            </>
          )}
        </Spin>
      </Card>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // const renderShippingAddress = (shippingAddress) => {
  //   const [name, phone, address] = shippingAddress.split(" - ");
  //   return (
  //     <div>
  //       <div>Tên: {name}</div>
  //       <div>Số điện thoại: {phone}</div>
  //       <div>Địa chỉ: {address}</div>
  //     </div>
  //   );
  // };

  return (
    <div className="order-management">
      {" "}
      {/* Cập nhật className */}
      <Tabs
        defaultActiveKey="1"
        className="setting-tabs"
        onChange={setCurrentTab}
      >
        <TabPane tab="Chờ lấy hàng" key="1">
          {renderTable(ordersPending, "Chờ lấy hàng", true)}
        </TabPane>
        <TabPane tab="Đang giao hàng" key="2">
          {renderTable(ordersShipping, "Đang giao hàng", true)}
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
          <Table sx={{ minWidth: 900 }} aria-label="simple table">
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
    </div>
  );
};

export default OrderManagement;
