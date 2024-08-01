import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Row,
  Col,
  Divider,
  message,
  Modal,
  Spin,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Logo from "../../Components/logo/Logo";
import { useUsers } from "../../Services/Hooks/useUsers";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.scss";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import Cookies from "js-cookie";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { onLogIn } = useUsers();
  const navigate = useNavigate();

  const [modalForm] = useForm();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await onLogIn(values.email, values.password);

        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
        if (error.response && error.response.data) {
          message.error(error.response.data.message || "Đăng nhập thất bại");
        } else {
          message.error("Đăng nhập thất bại");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const loginAdmin = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/loginadmin", {
        username: values.email,
        password: values.password,
      });

      const { token, role } = response.data;

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", role, { expires: 7 });

      if (role === "Admin") {
        navigate("/adminPage");
      } else if (role === "Staff") {
        navigate("/staffPage");
      } else {
        throw new Error("Role không hợp lệ");
      }

      message.success("Đăng nhập thành công");
      handleCloseLoginModal();
    } catch (error) {
      console.error("Error logging in:", error);
      message.error(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row className="signIn">
        <Col md={12} className="signIn__card">
          <div className="signIn__card__logo">
            <Logo />
          </div>
          <Card style={{ width: 500 }} className="signIn__card__detail">
            <Form
              name="normal_login"
              className="login-form signIn__card__detail__input"
              initialValues={{
                remember: true,
              }}
              onFinish={formik.handleSubmit}
            >
              <Form.Item
                name="email"
                validateStatus={formik.errors.email ? "error" : ""}
                help={formik.errors.email}
              >
                <Input
                  className="signIn__card__detail__input__detail"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
              </Form.Item>
              <Form.Item
                name="password"
                validateStatus={formik.errors.password ? "error" : ""}
                help={formik.errors.password}
              >
                <Input.Password
                  className="signIn__card__detail__input__detail"
                  placeholder="Mật khẩu"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  {...formik.getFieldProps("password")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="signIn__card__detail__options__option"
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2em",
                    textTransform: "uppercase",
                  }}
                  loading={loading}
                  disabled={formik.isSubmitting}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <p>
              Bạn chưa có tài khoản?&nbsp;
              <Link to="/sign-up" style={{ color: "#ff469e" }}>
                Đăng ký
              </Link>
            </p>
            <Button
              type="link"
              onClick={handleShowLoginModal}
              style={{
                color: "#ff469e",
                fontSize: "1em",
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
                textDecoration: "none",
                display: "block",
                margin: "0 auto",
              }}
            >
              Tài khoản nhân viên
            </Button>
          </Card>
        </Col>
        <Col className="signIn__sidePic" md={12}></Col>

        <Modal
          title="Đăng nhập cho Tài khoản nhân viên"
          open={showLoginModal}
          onCancel={handleCloseLoginModal}
          footer={[
            <Button key="cancel" onClick={handleCloseLoginModal}>
              Hủy
            </Button>,
            <Button
              key="login"
              type="primary"
              onClick={() => modalForm.submit()}
            >
              Đăng nhập
            </Button>,
          ]}
        >
          <Form
            form={modalForm}
            name="staff_admin_login"
            initialValues={{
              email: "",
              password: "",
            }}
            onFinish={loginAdmin}
          >
            <Form.Item name="email">
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </Spin>
  );
};

export default SignIn;
