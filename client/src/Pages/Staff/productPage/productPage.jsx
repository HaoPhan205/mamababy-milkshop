import React, { useEffect, useState } from "react";
import { TinyColor } from "@ctrl/tinycolor";
import {
  Button,
  Table,
  Layout,
  Typography,
  Row,
  Col,
  ConfigProvider,
} from "antd";
import {
  FormOutlined,
  DownloadOutlined,
  UploadOutlined,
  TagOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import api from "../../../config/axios";
import "./productPage.scss";

const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());
const { Header, Content } = Layout;
const { Title } = Typography;

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [activeButton, setActiveButton] = useState("myCourses");

  useEffect(() => {
    api
      .get("/api/productitems/")
      .then((response) => {
        if (response.data && response.data.data) {
          setCourses(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const myPurchases = [
    {
      key: 1,
      itemNo: 1,
      title: "Purchased Course 1",
      vendor: "Vendor A",
      category: "Development",
      deliveryType: "Online",
      price: "$50",
      purchaseDate: "2023-01-01",
    },
    {
      key: 2,
      itemNo: 2,
      title: "Purchased Course 2",
      vendor: "Vendor B",
      category: "Business",
      deliveryType: "Offline",
      price: "$70",
      purchaseDate: "2023-02-01",
    },
  ];

  const upcomingCourses = [
    {
      key: 1,
      itemNo: 1,
      title: "Upcoming Course 1",
      thumbnail: "https://via.placeholder.com/100",
      category: "Design",
      price: "$100",
      date: "2024-01-01",
      status: "Draft",
    },
    {
      key: 2,
      itemNo: 2,
      title: "Upcoming Course 2",
      thumbnail: "https://via.placeholder.com/100",
      category: "Marketing",
      price: "$120",
      date: "2024-02-01",
      status: "Draft",
    },
  ];

  const discounts = [
    {
      key: 1,
      itemNo: 1,
      course: "Discounted Course 1",
      startDate: "2023-03-01",
      endDate: "2023-04-01",
      discount: "20%",
      status: "Active",
    },
    {
      key: 2,
      itemNo: 2,
      course: "Discounted Course 2",
      startDate: "2023-05-01",
      endDate: "2023-06-01",
      discount: "30%",
      status: "Expired",
    },
  ];

  const getColumns = () => {
    switch (activeButton) {
      case "myPurchases":
        return [
          { title: "Item No.", dataIndex: "itemNo", key: "itemNo" },
          { title: "Title", dataIndex: "title", key: "title" },
          { title: "Vendor", dataIndex: "vendor", key: "vendor" },
          { title: "Category", dataIndex: "category", key: "category" },
          {
            title: "Delivery Type",
            dataIndex: "deliveryType",
            key: "deliveryType",
          },
          { title: "Price", dataIndex: "price", key: "price" },
          {
            title: "Purchase Date",
            dataIndex: "purchaseDate",
            key: "purchaseDate",
          },
          {
            title: "Actions",
            key: "action",
            render: () => (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 8, width: "80px", height: "40.5px" }}
                >
                  View
                </Button>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                          ", "
                        )})`,
                        colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                          colors3
                        ).join(", ")})`,
                        colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                          colors3
                        ).join(", ")})`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button
                    type="primary"
                    style={{ marginRight: 8, width: "80px", height: "40.5px" }}
                  >
                    Return
                  </Button>
                </ConfigProvider>
              </>
            ),
          },
        ];
      case "upcomingCourses":
        return [
          { title: "Item No.", dataIndex: "itemNo", key: "itemNo" },
          { title: "Title", dataIndex: "title", key: "title" },
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (text) => (
              <img src={text} alt="thumbnail" width={50} height={50} />
            ),
          },
          { title: "Category", dataIndex: "category", key: "category" },
          { title: "Price", dataIndex: "price", key: "price" },
          { title: "Date", dataIndex: "date", key: "date" },
          { title: "Status", dataIndex: "status", key: "status" },
          {
            title: "Actions",
            key: "action",
            render: () => (
              <>
                <Button type="primary" style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </>
            ),
          },
        ];
      case "discounts":
        return [
          { title: "Item No.", dataIndex: "itemNo", key: "itemNo" },
          { title: "Course", dataIndex: "course", key: "course" },
          { title: "Start Date", dataIndex: "startDate", key: "startDate" },
          { title: "End Date", dataIndex: "endDate", key: "endDate" },
          { title: "Discount", dataIndex: "discount", key: "discount" },
          { title: "Status", dataIndex: "status", key: "status" },
          {
            title: "Actions",
            key: "action",
            render: () => (
              <>
                <Button type="primary" style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </>
            ),
          },
        ];
      default:
        return [
          {
            title: "Item No.",
            dataIndex: "itemNo",
            key: "itemNo",
            render: (text, record, index) => index + 1,
          },
          { title: "Title", dataIndex: "courseTitle", key: "courseTitle" },
          {
            title: "Publish Date",
            dataIndex: "publishDate",
            key: "publishDate",
            render: (date) => new Date(date).toLocaleDateString(),
          },
          { title: "Sales", dataIndex: "sales", key: "sales", default: 0 },
          { title: "Parts", dataIndex: "parts", key: "parts", default: 0 },
          {
            title: "Category",
            dataIndex: ["category", "categoryName"],
            key: "category",
          },
          { title: "Status", dataIndex: "courseStatus", key: "courseStatus" },
          {
            title: "Actions",
            key: "action",
            render: (text, record) => (
              <>
                <Button type="primary" style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </>
            ),
          },
        ];
    }
  };

  const getData = () => {
    switch (activeButton) {
      case "myPurchases":
        return myPurchases;
      case "upcomingCourses":
        return upcomingCourses;
      case "discounts":
        return discounts;
      default:
        return courses.map((course, index) => ({
          ...course,
          key: index,
        }));
    }
  };

  return (
    <Layout className="course-page">
      <Header className="course-page-header">
        <Title level={2} style={{ color: "white" }}>
          Courses
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <div className="course-page-navigation">
          <Row gutter={16}>
            <Col>
              <Button
                type={activeButton === "myCourses" ? "primary" : "default"}
                onClick={() => setActiveButton("myCourses")}
              >
                <FormOutlined />
                My Courses
              </Button>
            </Col>
            <Col>
              <Button
                type={activeButton === "myPurchases" ? "primary" : "default"}
                onClick={() => setActiveButton("myPurchases")}
              >
                <DownloadOutlined />
                My Purchases
              </Button>
            </Col>
            <Col>
              <Button
                type={
                  activeButton === "upcomingCourses" ? "primary" : "default"
                }
                onClick={() => setActiveButton("upcomingCourses")}
              >
                <UploadOutlined />
                Upcoming Courses
              </Button>
            </Col>
            <Col>
              <Button
                type={activeButton === "discounts" ? "primary" : "default"}
                onClick={() => setActiveButton("discounts")}
              >
                <TagOutlined />
                Discounts
              </Button>
            </Col>
            <Col>
              <Button
                type={activeButton === "promotions" ? "primary" : "default"}
                onClick={() => setActiveButton("promotions")}
              >
                <NotificationOutlined />
                Promotions
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          columns={getColumns()}
          dataSource={getData()}
          pagination={{ pageSize: 10 }}
          style={{ marginTop: "20px" }}
        />
      </Content>
    </Layout>
  );
};

export default CoursePage;
