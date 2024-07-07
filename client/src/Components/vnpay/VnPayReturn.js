// src/components/VnPayReturn.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const VnPayReturn = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const params = queryString.parse(location.search);
      try {
        const response = await axios.get("/api/vnpay/verify", { params });
        setPaymentStatus(response.data);
      } catch (error) {
        console.error(
          "Failed to verify payment:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchPaymentStatus();
  }, [location.search]);

  return (
    <div>
      <h1>VNPay Payment Return</h1>
      {paymentStatus ? (
        <div>
          <p>Status: {paymentStatus.success ? "Success" : "Failed"}</p>
          <p>Transaction ID: {paymentStatus.transactionId}</p>
          <p>Order ID: {paymentStatus.orderId}</p>
        </div>
      ) : (
        <p>Loading payment status...</p>
      )}
    </div>
  );
};

export default VnPayReturn;
