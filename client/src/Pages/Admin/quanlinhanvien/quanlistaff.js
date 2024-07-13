import React, { useState, useEffect } from "react";
import { Card, Spin, message, Button, Popconfirm } from "antd";
import "./quanlistaff.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../../../config/axios";
import StaffFormModal from "./StaffFormModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const makeStyle = (role) => {
  switch (role) {
    case "Admin":
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    case "Staff":
      return {
        background: "#ffadad8f",
        color: "red",
      };
    default:
      return {
        background: "transparent",
        color: "black",
      };
  }
};

const renderTable = (admins, loadingState, onEdit, onDelete) => (
  <Card title="Danh sách nhân viên" style={{ marginBottom: 20 }}>
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
            {admins.map((admin) => (
              <TableRow key={admin.adminID}>
                <TableCell>{admin.adminID}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.password}</TableCell>
                <TableCell>
                  <span className="status" style={makeStyle(admin.role)}>
                    {admin.role}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => onEdit(admin)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this staff?"
                      onConfirm={() => onDelete(admin.adminID)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" danger icon={<DeleteOutlined />}>
                        Delete
                      </Button>
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
  const [admins, setAdmins] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const fetchAdmins = () => {
    setLoadingState(true);
    api
      .get("/api/admins")
      .then((res) => {
        const staff = res.data.filter((admin) => admin.role === "Staff");
        setAdmins(staff);
        setLoadingState(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch staff members");
        setLoadingState(false);
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdd = (values) => {
    console.log("Add Staff:", values);

    const isDuplicateID = admins.some(
      (admin) => admin.adminID === values.adminID
    );
    const isDuplicateEmail = admins.some(
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
      .post("/api/admins", { ...values, role: "Staff" })
      .then((response) => {
        console.log("Response:", response);
        message.success("Thêm tài khoản nhân viên thành công");
        fetchAdmins();
        setModalVisible(false);
        setCurrentAdmin(null);
      })
      .catch((err) => {
        console.error("Request Error:", err);
        message.error("Lưu thất bại");
      });
  };

  const handleEdit = (values) => {
    console.log("Edit Staff:", values);

    const isDuplicateID = admins.some(
      (admin) =>
        admin.adminID === values.adminID &&
        admin.adminID !== (currentAdmin?.adminID || "")
    );
    const isDuplicateEmail = admins.some(
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
      currentAdmin.role === values.role
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
      })
      .then((response) => {
        console.log("Response:", response);
        message.success("Cập nhật tài khoản nhân viên thành công");
        fetchAdmins();
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
        fetchAdmins();
      })
      .catch((err) => {
        console.error(err);
        message.error("Xoá không thành công");
      });
  };

  return (
    <div className="staffs">
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
      {renderTable(
        admins,
        loadingState,
        (admin) => {
          setCurrentAdmin(admin);
          setModalVisible(true);
        },
        handleDelete
      )}
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
