import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Spin,
  message,
  InputNumber,
  Button,
  Typography,
  Row,
  Col,
  Card,
} from "antd";
import api from "../../../config/axios";
import "./RevenueChart.scss";

const { Title } = Typography;

const MonthlyRevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalYearlyRevenue, setTotalYearlyRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2024);

  const fetchRevenueData = async (year) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/revenue/monthly?year=${year}`);
      setRevenueData(response.data.monthlyRevenues);
      setTotalYearlyRevenue(response.data.totalYearlyRevenue);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
      message.error("Lỗi khi lấy dữ liệu doanh thu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData(year);
  }, [year]);

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const formattedData = revenueData.map((item) => ({
    month: monthNames[item.month - 1],
    revenue: item.totalRevenue,
  }));

  // Định dạng tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleFetchData = () => {
    fetchRevenueData(year);
  };

  return (
    <div
      className="monthly-revenue-chart"
      style={{ width: "100%", height: 500 }}
    >
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={3}>Biểu đồ doanh thu năm {year}</Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <InputNumber
            min={2020}
            max={2024}
            value={year}
            onChange={handleYearChange}
            style={{ width: 200, marginRight: 10 }}
            // formatter={(value) =>
            //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // }
            // parser={(value) => value.replace(/\$\s?|(\.*)/g, "")}
          />
          <Button type="primary" onClick={handleFetchData}>
            Lấy dữ liệu
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <Card>
            <Title level={4}>
              Tổng doanh thu: {formatCurrency(totalYearlyRevenue)}
            </Title>
          </Card>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedData}
            margin={{
              top: 10,
              right: 50,
              left: 60,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Spin>
    </div>
  );
};

export default MonthlyRevenueChart;
