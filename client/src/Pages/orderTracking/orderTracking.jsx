import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/reduxReducer/oderSlice";

const OrderTracking = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const userId = "userId123"; // Giả sử bạn đã có userId từ đâu đó, ví dụ từ state hoặc props

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders(userId));
    }
  }, [orderStatus, dispatch, userId]);

  let content;

  if (orderStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (orderStatus === "succeeded") {
    content = (
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total: {order.total}</p>
          </li>
        ))}
      </ul>
    );
  } else if (orderStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Order Tracking</h2>
      {content}
    </div>
  );
};

export default OrderTracking;
