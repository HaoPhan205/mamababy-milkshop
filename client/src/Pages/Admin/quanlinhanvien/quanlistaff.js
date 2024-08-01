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

const makeStyle = (role) => {
  switch (role) {
    case "Admin":
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    case "Staff":
      return {
        background: "#ff469e",
        color: "white",
      };
    default:
      return {
        background: "transparent",
        color: "black",
      };
  }
};

const Staffs = () => {
  const [adminsAndStaffs, setAdminsAndStaffs] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchAdminsAndStaffs = () => {
    setLoadingState(true);
    api
      .get("/api/admins")
      .then((res) => {
        setAdminsAndStaffs(res.data);
        setLoadingState(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch staff members");
        setLoadingState(false);
      });
  };

  useEffect(() => {
    fetchAdminsAndStaffs();
  }, []);

  const handleAdd = (values) => {
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

    api
      .post("/api/admins", { ...values, role: "Staff", status: "No" })
      .then((response) => {
        message.success("Thêm tài khoản nhân viên thành công");
        fetchAdminsAndStaffs();
        setModalVisible(false);
        setCurrentAdmin(null);
      })
      .catch((err) => {
        console.error("Request Error:", err);
        message.error("Lưu thất bại");
      });
  };

  const handleEdit = (values) => {
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

    api
      .put(`/api/admins/${currentAdmin.adminID}`, {
        adminID: values.adminID,
        username: values.username,
        password: values.password,
        role: values.role,
        status: values.status,
      })
      .then((response) => {
        message.success("Cập nhật tài khoản nhân viên thành công");
        fetchAdminsAndStaffs();
        setModalVisible(false);
        setCurrentAdmin(null);
      })
      .catch((err) => {
        console.error("Request Error:", err);
        message.error("Lưu thất bại");
      });
  };

  const handleDelete = (adminID) => {
    api
      .delete(`/api/admins/${adminID}`)
      .then(() => {
        message.success("Đã xoá tài khoản nhân viên");
        fetchAdminsAndStaffs();
      })
      .catch((err) => {
        console.error(err);
        message.error("Xoá không thành công");
      });
  };

  const handleApprove = (admin) => {
    api
      .put(`/api/admins/${admin.admin}`, {
        username: admin.username,
        password: admin.password,
        status: "Yes",
      })
      .then(() => {
        message.success("Đã phê duyệt tài khoản");
        fetchAdminsAndStaffs();
      })
      .catch((err) => {
        message.error("Phê duyệt không thành công");
      });
  };

  const handleDeactivate = (admin) => {
    api
      .put(`/api/admins/${admin.admin}`, {
        username: admin.username,
        password: admin.password,
        status: "No",
      })
      .then(() => {
        message.success("Đã vô hiệu hoá tài khoản nhân viên");
        fetchAdminsAndStaffs();
      })
      .catch((err) => {
        console.error(err);
        message.error("Vô hiệu hoá không thành công");
      });
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
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedStaffs(activeStaffs).map((admin) => (
                      <TableRow key={admin.adminID}>
                        <TableCell>{admin.adminID}</TableCell>
                        <TableCell>{admin.username}</TableCell>
                        <TableCell>{admin.password}</TableCell>
                        <TableCell>
                          <span
                            className="status"
                            style={makeStyle(admin.role)}
                          >
                            {admin.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="action-buttons">
                            <Button
                              type="link"
                              icon={<EditOutlined />}
                              onClick={() => {
                                setCurrentAdmin(admin);
                                setModalVisible(true);
                              }}
                            ></Button>
                            <Popconfirm
                              title="Xác nhận xoá tài khoản nhân viên"
                              onConfirm={() => handleDelete(admin.adminID)}
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
                              onConfirm={() => handleDeactivate(admin)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="link">Vô hiệu hoá</Button>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={activeStaffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage="Số hàng mỗi trang"
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đang không hoạt động" key="2">
          <Card
            title="Danh sách nhân viên đang không hoạt động"
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
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedStaffs(inactiveStaffs).map((admin) => (
                      <TableRow key={admin.adminID}>
                        <TableCell>{admin.adminID}</TableCell>
                        <TableCell>{admin.username}</TableCell>
                        <TableCell>{admin.password}</TableCell>
                        <TableCell>
                          <span
                            className="status"
                            style={makeStyle(admin.role)}
                          >
                            {admin.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="action-buttons">
                            <Button
                              type="link"
                              icon={<EditOutlined />}
                              onClick={() => {
                                setCurrentAdmin(admin);
                                setModalVisible(true);
                              }}
                            ></Button>
                            <Popconfirm
                              title="Xác nhận xoá tài khoản nhân viên"
                              onConfirm={() => handleDelete(admin.adminID)}
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
                              onConfirm={() => handleApprove(admin)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="link">Kích hoạt</Button>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={inactiveStaffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage="Số hàng mỗi trang"
          />
        </Tabs.TabPane>
      </Tabs>
      <StaffFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={currentAdmin ? handleEdit : handleAdd}
        initialValues={currentAdmin}
      />
    </div>
  );
};

export default Staffs;
