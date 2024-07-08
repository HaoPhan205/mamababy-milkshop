import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Row,
  Spin,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.scss";
import Logo from "../../Components/logo/Logo";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function SignIn() {
  const { login, loading, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please input your email!"),
    password: Yup.string().required("Please input your password!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password, "customer"); // assuming customer login here
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
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
              help={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              validateStatus={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
            >
              <Input
                className="signIn__card__detail__input__detail"
                prefix={
                  <MailOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item
              name="password"
              help={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              validateStatus={
                formik.touched.password && formik.errors.password ? "error" : ""
              }
            >
              <Input.Password
                className="signIn__card__detail__input__detail"
                placeholder="Mật khẩu"
                prefix={
                  <LockOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{ fontFamily: "Gantari" }}
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                >
                  Lưu tài khoản
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <div className="signIn__card__detail__options">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        borderRadius: "20px",
                        defaultBg: "#ff469e",
                        defaultColor: "white",
                        defaultHoverBg: "black",
                        defaultHoverBorderColor: "black",
                        defaultHoverColor: "white",
                        defaultActiveBg: "#ff469e",
                        activeBorderColor: "#ff469e",
                        defaultActiveColor: "white",
                        defaultActiveBorderColor: "#ff469e",
                      },
                    },
                  }}
                >
                  <Button
                    className="signIn__card__detail__options__option"
                    htmlType="submit"
                    style={{
                      fontWeight: "500",
                      fontSize: "1.2em",
                      textTransform: "uppercase",
                    }}
                    loading={loading}
                  >
                    <Spin spinning={loading}>Đăng nhập</Spin>
                  </Button>
                </ConfigProvider>
              </div>
            </Form.Item>
          </Form>
          <p>
            Hoặc&nbsp;
            <Link to="/forgot-password" style={{ color: "#ff469e" }}>
              {" "}
              Quên mật khẩu
            </Link>
          </p>
          <Divider />
          <p>
            Bạn chưa có tài khoản? &nbsp;
            <Link to="/sign-up" style={{ color: "#ff469e" }}>
              {" "}
              Đăng ký
            </Link>
          </p>
        </Card>
      </Col>
      <Col className="signIn__sidePic" md={12}></Col>
    </Row>
  );
}
