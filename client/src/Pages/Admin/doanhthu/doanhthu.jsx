import React, { useState } from "react";
import { Form, Input, Button, Table, Typography, message, Spin } from "antd";
import api from "../../../config/axios";
import "./doanhthu.scss";
const { Title, Text } = Typography;

const RevenuePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [view, setView] = useState("monthly"); // 'monthly', 'weekly', or 'daily'

  const handleSubmit = async (values) => {
    setLoading(true);
    const { year, month, weekNumber, day } = values;

    try {
      let response;
      if (view === "monthly") {
        response = await api.get(`/api/revenue/monthly?year=${year}`);
      } else if (view === "weekly") {
        response = await api.get(
          `/api/revenue/weekly?year=${year}&weekNumber=${weekNumber}`
        );
      } else if (view === "daily") {
        response = await api.get(
          `/api/revenue/daily?year=${year}&month=${month}&day=${day}`
        );
      }

      setData(response.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      message.error("Failed to fetch revenue data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
    setData(null); // Reset data on view change
  };

  const renderTable = () => {
    if (view === "monthly") {
      return (
        <Table
          dataSource={data?.monthlyRevenues}
          columns={[
            { title: "Month", dataIndex: "month", key: "month" },
            {
              title: "Total Revenue",
              dataIndex: "totalRevenue",
              key: "totalRevenue",
              render: (text) => (
                <Text>
                  {text.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              ),
            },
            {
              title: "Order Count",
              dataIndex: "orderCount",
              key: "orderCount",
            },
          ]}
          rowKey="month"
          pagination={false}
        />
      );
    } else if (view === "weekly") {
      return (
        <Table
          dataSource={[data]}
          columns={[
            {
              title: "Week Number",
              dataIndex: "weekNumber",
              key: "weekNumber",
            },
            {
              title: "Total Revenue",
              dataIndex: "totalRevenue",
              key: "totalRevenue",
              render: (text) => (
                <Text>
                  {text.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              ),
            },
            {
              title: "Order Count",
              dataIndex: "orderCount",
              key: "orderCount",
            },
          ]}
          rowKey="weekNumber"
          pagination={false}
        />
      );
    } else if (view === "daily") {
      return (
        <Table
          dataSource={[data]}
          columns={[
            { title: "Date", dataIndex: "date", key: "date" },
            {
              title: "Total Revenue",
              dataIndex: "totalRevenue",
              key: "totalRevenue",
              render: (text) => (
                <Text>
                  {text.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              ),
            },
            {
              title: "Order Count",
              dataIndex: "orderCount",
              key: "orderCount",
            },
          ]}
          rowKey="date"
          pagination={false}
        />
      );
    }
  };

  return (
    <div className="revenue-page">
      <Title level={2}>Doanh thu</Title>
      <div className="view-controls">
        <Button
          onClick={() => handleViewChange("monthly")}
          type={view === "monthly" ? "primary" : "default"}
        >
          Doanh thu theo tháng
        </Button>
        <Button
          onClick={() => handleViewChange("weekly")}
          type={view === "weekly" ? "primary" : "default"}
        >
          Doanh thu theo tuần
        </Button>
        <Button
          onClick={() => handleViewChange("daily")}
          type={view === "daily" ? "primary" : "default"}
        >
          Doanh thu theo ngày
        </Button>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="year"
          label="Năm"
          rules={[{ required: true, message: "Vui lòng nhập năm" }]}
        >
          <Input type="number" placeholder="Nhập năm" />
        </Form.Item>
        {view === "monthly" && (
          <>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xem doanh thu theo tháng
              </Button>
            </Form.Item>
          </>
        )}
        {view === "weekly" && (
          <>
            <Form.Item
              name="weekNumber"
              label="Tuần số"
              rules={[{ required: true, message: "Vui lòng nhập tuần số" }]}
            >
              <Input type="number" placeholder="Nhập tuần số" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xem doanh thu theo tuần
              </Button>
            </Form.Item>
          </>
        )}
        {view === "daily" && (
          <>
            <Form.Item
              name="month"
              label="Tháng"
              rules={[{ required: true, message: "Vui lòng nhập tháng" }]}
            >
              <Input type="number" placeholder="Nhập tháng" />
            </Form.Item>
            <Form.Item
              name="day"
              label="Ngày"
              rules={[{ required: true, message: "Vui lòng nhập ngày" }]}
            >
              <Input type="number" placeholder="Nhập ngày" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xem doanh thu theo ngày
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
      {loading ? (
        <Spin size="large" style={{ display: "block", marginTop: 20 }} />
      ) : (
        data && renderTable()
      )}
    </div>
  );
};

export default RevenuePage;
