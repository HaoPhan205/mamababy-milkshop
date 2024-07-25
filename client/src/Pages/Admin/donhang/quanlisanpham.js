import React, { useState, useEffect } from "react";
import {
  Card,
  Spin,
  message,
  Button,
  Popconfirm,
  Input,
  Modal,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./quanlisanpham.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import api from "../../../config/axios";
import StaffFormModal from "./ProductsFormModal";

const makeStyle = (stockQuantity) => {
  if (stockQuantity === 0) {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  }
};

const renderImages = (image1, image2, image3) => (
  <Row gutter={[16, 16]}>
    <Col span={8}>
      <img src={image1} alt="Hinh anh 1" style={{ width: "100%" }} />
    </Col>
    <Col span={8}>
      <img src={image2} alt="Hinh anh 2" style={{ width: "100%" }} />
    </Col>
    <Col span={8}>
      <img src={image3} alt="Hinh anh 3" style={{ width: "100%" }} />
    </Col>
  </Row>
);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const renderTable = (products, loadingState, onEdit, onDelete, onView) => (
  <Card title="Danh sách sản phẩm" style={{ marginBottom: 20 }}>
    <Spin spinning={loadingState}>
      <TableContainer
        component={Paper}
        className="table-container"
        sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="left">Đối tượng sử dụng</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Khuyến mãi</TableCell>
              <TableCell align="left">Đã bán</TableCell>
              <TableCell align="left">Lượng hàng</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productItemId}>
                <TableCell>{product.productItemId}</TableCell>
                <TableCell align="left">{product.itemName}</TableCell>
                <TableCell>
                  {product.baby ? (
                    <>
                      Trẻ từ {/* <br /> */}
                      {product.baby}
                    </>
                  ) : product.mama ? (
                    <>
                      Mẹ bầu {/* <br /> */}
                      {product.mama}
                    </>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>{product.soldQuantity}</TableCell>
                <TableCell>
                  <span
                    className="status"
                    style={makeStyle(product.stockQuantity)}
                  >
                    {product.stockQuantity === 0
                      ? "Hết hàng"
                      : product.stockQuantity}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => onView(product)}
                    />
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => onEdit(product)}
                    />
                    <Popconfirm
                      title="Are you sure to delete this product?"
                      onConfirm={() => onDelete(product.productItemId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Spin>
  </Card>
);

const Staffs = () => {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    setLoadingState(true);
    api
      .get("/api/productitems")
      .then((res) => {
        setProducts(res.data);
        setLoadingState(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Không thể tải sản phẩm");
        setLoadingState(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductDetail = (productItemId) => {
    api
      .get(`/api/productitems/${productItemId}`)
      .then((res) => {
        setSelectedProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Không thể tải chi tiết sản phẩm");
      });
  };

  const handleSearch = (value) => {
    setSearchText(value.trim().toLowerCase());
    setPage(0);
  };

  const filteredProducts = searchText
    ? products.filter(
        (product) =>
          product.productItemId.toLowerCase().includes(searchText) ||
          product.itemName.toLowerCase().includes(searchText) ||
          product.price.toString().includes(searchText) ||
          product.stockQuantity.toString().includes(searchText)
      )
    : products;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAddEdit = (values) => {
    const { productItemId } = values;
    const isDuplicateID = products.some(
      (product) =>
        product.productItemId === productItemId &&
        product.productItemId !== (currentProduct?.productItemId || "")
    );

    if (isDuplicateID) {
      message.error("Mã đơn hàng đã tồn tại");
      return;
    }

    const apiCall = currentProduct
      ? api.put(`/api/productitems/${currentProduct.productItemId}`, values)
      : api.post("/api/productitems", values);

    apiCall
      .then(() => {
        message.success(
          currentProduct
            ? "Sản phẩm cập nhật thành công"
            : "Sản phẩm thêm thành công"
        );
        fetchProducts();
        setModalVisible(false);
        setCurrentProduct(null);
      })
      .catch((err) => {
        console.error(err);
        message.error("Không thể lưu sản phẩm");
      });
  };

  const handleDelete = (productItemId) => {
    api
      .delete(`/api/productitems/softdelete/${productItemId}`)
      .then(() => {
        message.success("Product deleted successfully");
        fetchProducts();
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to delete product");
      });
  };

  const handleView = (product) => {
    fetchProductDetail(product.productItemId);
    setDetailVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentProduct(null);
  };

  return (
    <div className="staffs">
      <Input.Search
        placeholder="Search products"
        allowClear
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setCurrentProduct(null);
          setModalVisible(true);
        }}
      >
        Thêm sản phẩm
      </Button>
      {renderTable(
        paginatedProducts,
        loadingState,
        (product) => {
          setCurrentProduct(product);
          setModalVisible(true);
        },
        handleDelete,
        handleView
      )}
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <StaffFormModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleAddEdit}
        initialValues={currentProduct}
      />
      <Modal
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        title={selectedProduct?.itemName}
        footer={null}
        width={800}
      >
        <h3>Thông tin chi tiết sản phẩm:</h3>
        {selectedProduct && (
          <div>
            <p>
              <strong>Mã sản phẩm:</strong> {selectedProduct.productItemId}
            </p>
            <p>
              <strong>Tên sản phẩm:</strong> {selectedProduct.itemName}
            </p>
            <p>
              <strong>Đối tượng sử dụng:</strong>{" "}
              {selectedProduct.baby
                ? `trẻ từ ${selectedProduct.baby}`
                : selectedProduct.mama
                ? `mẹ bầu ${selectedProduct.mama}`
                : "N/A"}
            </p>
            <p>
              <strong>Giá:</strong> {formatCurrency(selectedProduct.price)}
            </p>
            <TableCell>{selectedProduct.soldQuantity}</TableCell>
            <TableCell>
              <span
                className="status"
                style={makeStyle(selectedProduct.stockQuantity)}
              >
                {selectedProduct.stockQuantity === 0
                  ? "Hết hàng"
                  : selectedProduct.stockQuantity}
              </span>
            </TableCell>
            <p>
              <strong>Thương hiệu:</strong> {selectedProduct.brandName}
            </p>
            <p>
              <strong>Xuất xứ:</strong> {selectedProduct.countryName}
            </p>
            <p>
              <strong>Công ty sản xuất:</strong> {selectedProduct.companyName}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Lợi ích:</strong> {selectedProduct.benefit}
            </p>
            {renderImages(
              selectedProduct.image1,
              selectedProduct.image2,
              selectedProduct.image3
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Staffs;
