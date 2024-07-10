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
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
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
      <img src={image1} alt="Product Image 1" style={{ width: "100%" }} />
    </Col>
    <Col span={8}>
      <img src={image2} alt="Product Image 2" style={{ width: "100%" }} />
    </Col>
    <Col span={8}>
      <img src={image3} alt="Product Image 3" style={{ width: "100%" }} />
    </Col>
  </Row>
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
        message.error("Failed to fetch products");
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
        setDetailVisible(true);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch product details");
      });
  };

  const handleSearch = (value) => {
    setSearchText(value.trim().toLowerCase());
    setPage(0);
  };

  const filteredProducts = searchText
    ? products.filter((product) => {
        const lowerCaseSearch = searchText.toLowerCase();
        return (
          product.productItemId.toLowerCase().includes(lowerCaseSearch) ||
          product.itemName.toLowerCase().includes(lowerCaseSearch) ||
          product.price.toString().includes(lowerCaseSearch) ||
          product.stockQuantity.toString().includes(lowerCaseSearch)
        );
      })
    : products;

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

    const request = currentProduct
      ? api.put(`/api/productitems/${currentProduct.productItemId}`, values)
      : api.post("/api/productitems", values);

    request
      .then(() => {
        message.success(
          currentProduct
            ? "Product updated successfully"
            : "Product added successfully"
        );
        fetchProducts();
        setModalVisible(false);
        setCurrentProduct(null);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to save product");
      });
  };

  const handleDelete = (productItemId) => {
    api
      .delete(`/api/productitems/${productItemId}`)
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
  };

  const renderTable = () => (
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
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell align="left">Tên đơn hàng</TableCell>
                <TableCell align="left">Đối tượng sử dụng</TableCell>
                <TableCell align="left">Giá</TableCell>
                <TableCell align="left">Đã bán</TableCell>
                <TableCell align="left">Lượng hàng</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.productItemId}>
                  <TableCell>{product.productItemId}</TableCell>
                  <TableCell>{product.itemName}</TableCell>
                  <TableCell>
                    {product.baby ? (
                      <>
                        trẻ từ <br />
                        {product.baby}
                      </>
                    ) : product.mama ? (
                      <>
                        mẹ bầu <br />
                        {product.mama}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.soldQuantity}</TableCell>
                  <TableCell>
                    <span
                      className="status"
                      style={makeStyle(product.stockQuantity)}
                    >
                      {product.stockQuantity === 0
                        ? "Hết hàng"
                        : product.soldQuantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(product)}
                      />
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setCurrentProduct(product);
                          setModalVisible(true);
                        }}
                      />
                      <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(product.productItemId)}
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

  return (
    <div className="staffs">
      <Input.Search
        placeholder="Search products"
        allowClear
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
      {renderTable()}
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Modal
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        title="Thông tin chi tiết sản phẩm"
        footer={null}
      >
        {selectedProduct && (
          <div>
            <p>
              <strong>Mã đơn hàng:</strong> {selectedProduct.productItemId}
            </p>
            <p>
              <strong>Tên đơn hàng:</strong> {selectedProduct.itemName}
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
              <strong>Giá:</strong> {selectedProduct.price}
            </p>
            <p>
              <strong>Đã bán:</strong> {selectedProduct.soldQuantity}
            </p>
            <p>
              <strong>Lượng hàng:</strong>{" "}
              <span
                className="status"
                style={makeStyle(selectedProduct.stockQuantity)}
              >
                {selectedProduct.stockQuantity === 0
                  ? "Hết hàng"
                  : selectedProduct.stockQuantity}
              </span>
            </p>
            <p>
              <strong>Hình ảnh:</strong>{" "}
              {renderImages(
                selectedProduct.image1,
                selectedProduct.image2,
                selectedProduct.image3
              )}
            </p>
          </div>
        )}
      </Modal>
      <StaffFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setCurrentProduct(null);
        }}
        onSubmit={handleAddEdit}
        product={currentProduct}
      />
    </div>
  );
};

export default Staffs;
