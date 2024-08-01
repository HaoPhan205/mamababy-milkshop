import React, { useState, useEffect } from "react";
import { Card, Spin, message, Button, Popconfirm, Input, Tabs } from "antd";
import "./quanlistaff.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import api from "../../../config/axios";
import StaffFormModal from "./StaffFormModal";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Staffs = () => {
  const [adminsAndStaffs, setAdminsAndStaffs] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchAdminsAndStaffs = async () => {
    setLoadingState(true);
    try {
      const res = await api.get("/api/admins");
      setAdminsAndStaffs(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch staff members");
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchAdminsAndStaffs();
  }, []);

  const handleAdd = async (values) => {
    try {
      const isDuplicateID = adminsAndStaffs.some(
        (admin) => admin.adminID === values.adminID
      );
      const isDuplicateEmail = adminsAndStaffs.some(
        (admin) => admin.username === values.username
      );

      if (isDuplicateID) {
        message.error("Mã nhân viên đã tồn tại");
        return;
      }

      if (isDuplicateEmail) {
        message.error("Tài khoản đã tồn tại");
        return;
      }

      await api.post("/api/admins", { ...values, role: "Staff", status: "No" });
      message.success("Thêm tài khoản nhân viên thành công");
      fetchAdminsAndStaffs();
    } catch (err) {
      console.error("Request Error:", err);
      message.error("Lưu thất bại");
    } finally {
      setModalVisible(false);
      setCurrentAdmin(null);
    }
  };

  const handleEdit = async (values) => {
    try {
      const isDuplicateID = adminsAndStaffs.some(
        (admin) =>
          admin.adminID === values.adminID &&
          admin.adminID !== (currentAdmin?.adminID || "")
      );
      const isDuplicateEmail = adminsAndStaffs.some(
        (admin) =>
          admin.username === values.username &&
          admin.username !== (currentAdmin?.username || "")
      );

      if (isDuplicateID) {
        message.error("Mã nhân viên đã tồn tại");
        return;
      }

      if (isDuplicateEmail) {
        message.error("Tài khoản đã tồn tại");
        return;
      }

      if (
        currentAdmin &&
        currentAdmin.adminID === values.adminID &&
        currentAdmin.username === values.username &&
        currentAdmin.password === values.password &&
        currentAdmin.role === values.role &&
        currentAdmin.status === values.status
      ) {
        message.warning("Không có thay đổi nào được thực hiện");
        return;
      }

      await api.put(`/api/admins/${currentAdmin.adminID}`, values);
      message.success("Cập nhật tài khoản nhân viên thành công");
      fetchAdminsAndStaffs();
    } catch (err) {
      console.error("Request Error:", err);
      message.error("Lưu thất bại");
    } finally {
      setModalVisible(false);
      setCurrentAdmin(null);
    }
  };

  const handleDelete = async (adminID) => {
    try {
      await api.delete(`/api/admins/${adminID}`);
      message.success("Đã xoá tài khoản nhân viên");
      fetchAdminsAndStaffs();
    } catch (err) {
      console.error(err);
      message.error("Xoá không thành công");
    }
  };

  const handleApprove = async (admin) => {
    try {
      await api.put(`/api/admins/${admin.adminID}`, {
        ...admin,
        status: "Yes",
      });
      message.success("Đã phê duyệt tài khoản");
      fetchAdminsAndStaffs();
    } catch (err) {
      message.error("Phê duyệt không thành công");
    }
  };

  const handleDeactivate = async (admin) => {
    try {
      await api.put(`/api/admins/${admin.adminID}`, {
        ...admin,
        status: "No",
      });
      message.success("Đã vô hiệu hoá tài khoản nhân viên");
      fetchAdminsAndStaffs();
    } catch (err) {
      console.error(err);
      message.error("Vô hiệu hoá không thành công");
    }
  };

  const filteredStaffs = searchText
    ? adminsAndStaffs.filter(
        (admin) =>
          admin.adminID
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          admin.username.toLowerCase().includes(searchText.toLowerCase()) ||
          admin.role.toLowerCase().includes(searchText.toLowerCase())
      )
    : adminsAndStaffs;

  const activeStaffs = filteredStaffs.filter((admin) => admin.status === "Yes");
  const inactiveStaffs = filteredStaffs.filter(
    (admin) => admin.status === "No"
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStaffs = (staffList) =>
    staffList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="staffs">
      <div className="staffs__header">
        <Input
          placeholder="Tìm kiếm theo mã nhân viên, tài khoản hoặc vai trò"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 20, width: 400 }}
        />
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
            setCurrentAdmin(null);
          }}
          className="add-staff-button"
        >
          Tạo tài khoản nhân viên
        </Button>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Đang hoạt động" key="1">
          <Card
            title="Danh sách tài khoản nhân viên đang hoạt động"
            style={{ marginBottom: 20 }}
          >
            <Spin spinning={loadingState}>
              <TableContainer
                component={Paper}
                className="table-container"
                sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã nhân viên</TableCell>
                      <TableCell align="left">Tài khoản nhân viên</TableCell>
                      <TableCell align="left">Mật khẩu</TableCell>
                      <TableCell align="left">Vai trò</TableCell>
                      <TableCell align="left">Trạng thái</TableCell>
                      <TableCell align="left">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedStaffs(activeStaffs).map((row) => (
                      <TableRow key={row.adminID}>
                        <TableCell component="th" scope="row">
                          {row.adminID}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.password}</TableCell>
                        <TableCell align="left">
                          <span className="role-label">{row.role}</span>
                        </TableCell>
                        <TableCell align="left">
                          <span
                            style={{
                              backgroundColor:
                                row.status === "Yes" ? "#d4edda" : "#f8d7da",
                              color: row.status === "Yes" ? "green" : "red",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {row.status === "Yes"
                              ? "Đang hoạt động"
                              : "Đã vô hiệu hóa"}
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setModalVisible(true);
                              setCurrentAdmin(row);
                            }}
                          />
                          <Popconfirm
                            title="Xác nhận xoá tài khoản nhân viên"
                            onConfirm={() => handleDelete(row.adminID)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              type="link"
                              icon={<DeleteOutlined />}
                              danger
                            ></Button>
                          </Popconfirm>
                          <Popconfirm
                            title="Xác nhận vô hiệu hoá tài khoản nhân viên"
                            onConfirm={() => handleDeactivate(row)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link">Vô hiệu hoá</Button>
                          </Popconfirm>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={activeStaffs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                className="pagination-container"
                style={{ padding: "30" }}
              />
            </Spin>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Chưa hoạt động" key="2">
          <Card
            title="Danh sách tài khoản nhân viên chưa hoạt động"
            style={{ marginBottom: 20 }}
          >
            <Spin spinning={loadingState}>
              <TableContainer
                component={Paper}
                className="table-container"
                sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã nhân viên</TableCell>
                      <TableCell align="left">Tài khoản nhân viên</TableCell>
                      <TableCell align="left">Mật khẩu</TableCell>
                      <TableCell align="left">Vai trò</TableCell>
                      <TableCell align="left">Trạng thái</TableCell>
                      <TableCell align="left">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedStaffs(inactiveStaffs).map((row) => (
                      <TableRow key={row.adminID}>
                        <TableCell component="th" scope="row">
                          {row.adminID}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.password}</TableCell>
                        <TableCell align="left">
                          <span className="role-label">{row.role}</span>
                        </TableCell>
                        <TableCell align="left">
                          <span
                            style={{
                              backgroundColor:
                                row.status === "Yes" ? "#d4edda" : "#f8d7da",
                              color: row.status === "Yes" ? "green" : "red",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {row.status === "Yes"
                              ? "Đang hoạt động"
                              : "Đã vô hiệu hóa"}
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setModalVisible(true);
                              setCurrentAdmin(row);
                            }}
                          />
                          <Popconfirm
                            title="Xác nhận xoá tài khoản nhân viên"
                            onConfirm={() => handleDelete(row.adminID)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              type="link"
                              icon={<DeleteOutlined />}
                              danger
                            ></Button>
                          </Popconfirm>
                          <Popconfirm
                            title="Xác nhận kích hoạt tài khoản nhân viên"
                            onConfirm={() => handleApprove(row)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link">Kích hoạt</Button>
                          </Popconfirm>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={inactiveStaffs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Spin>
          </Card>
        </Tabs.TabPane>
      </Tabs>

      <StaffFormModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setCurrentAdmin(null);
        }}
        onSubmit={currentAdmin ? handleEdit : handleAdd}
        initialValues={currentAdmin || {}}
      />
    </div>
  );
};

export default Staffs;
