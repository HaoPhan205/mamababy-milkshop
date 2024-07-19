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
import CountryFormModal from "./CountryFormModal";
import "./CountryManagement.scss";

const renderTable = (countries, loadingState, onEdit, onDelete, onView) => (
  <Card title="Danh sách xuất xứ" style={{ marginBottom: 20 }}>
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
              <TableCell align="left">Tên quốc gia</TableCell>
              <TableCell align="left">Hình ảnh</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.countryId}>
                <TableCell>{country.countryId}</TableCell>
                <TableCell align="left">{country.countryName}</TableCell>
                <TableCell align="left">
                  <img
                    src={country.image}
                    alt={country.countryName}
                    style={{ width: 50 }}
                  />
                </TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => onEdit(country)}
                    />
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa quốc gia này?"
                      onConfirm={() => onDelete(country.countryId)}
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

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchCountries = () => {
    setLoadingState(true);
    api
      .get("/api/countries")
      .then((res) => {
        setCountries(res.data);
        setLoadingState(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Không thể tải danh sách quốc gia");
        setLoadingState(false);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value.trim().toLowerCase());
    setPage(0);
  };

  const filteredCountries = searchText
    ? countries.filter(
        (country) =>
          country.countryId.toString().includes(searchText) ||
          country.countryName.toLowerCase().includes(searchText)
      )
    : countries;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCountries = filteredCountries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAddEdit = (values) => {
    const { countryId } = values;

    const isDuplicateID = countries.some(
      (country) =>
        country.countryId === countryId &&
        country.countryId !== (currentCountry?.countryId || "")
    );

    if (isDuplicateID) {
      message.error("Mã quốc gia đã tồn tại");
      return;
    }

    const apiCall = currentCountry
      ? api.put(`/api/countries/${currentCountry.countryId}`, values)
      : api.post("/api/countries", values);

    apiCall
      .then(() => {
        message.success(
          currentCountry
            ? "Quốc gia cập nhật thành công"
            : "Quốc gia thêm thành công"
        );
        fetchCountries();
        setModalVisible(false);
        setCurrentCountry(null);
      })
      .catch((err) => {
        console.error(err);
        message.error("Không thể lưu quốc gia");
      });
  };

  const handleDelete = (countryId) => {
    api
      .delete(`/api/countries/softdelete/${countryId}`)
      .then(() => {
        message.success("Quốc gia xóa thành công");
        fetchCountries();
      })
      .catch((err) => {
        console.error(err);
        message.error("Không thể xóa quốc gia");
      });
  };

  const handleEdit = (country) => {
    setCurrentCountry(country);
    setModalVisible(true);
  };

  return (
    <div className="countries">
      <Input.Search
        placeholder="Tìm kiếm quốc gia"
        allowClear
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setCurrentCountry(null);
          setModalVisible(true);
        }}
      >
        Thêm quốc gia
      </Button>
      {renderTable(paginatedCountries, loadingState, handleEdit, handleDelete)}
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredCountries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <CountryFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddEdit}
        initialValues={currentCountry}
      />
    </div>
  );
};

export default Countries;
