import React, { useEffect, useState } from "react";
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
import { useUsers } from "../../Services/Hooks/useUsers";
import { toast } from "react-toastify";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { onLogIn } = useUsers();

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
      setLoading(true);
      await onLogIn(values.email, values.password);
      setLoading(false);
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      toast.success("Login successful");
      navigate("/");
    }
  }, [navigate]);

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
                placeholder="Password"
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
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{ fontFamily: "Gantari" }}
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
            </Form.Item> */}

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
                    <Spin spinning={loading}>Login</Spin>
                  </Button>
                </ConfigProvider>
              </div>
            </Form.Item>
          </Form>
          <p>
            Or&nbsp;
            <Link to="/forgot-password" style={{ color: "#ff469e" }}>
              Forgot password
            </Link>
          </p>
          <Divider />
          <p>
            Don't have an account?&nbsp;
            <Link to="/sign-up" style={{ color: "#ff469e" }}>
              Sign Up
            </Link>
          </p>
        </Card>
      </Col>
      <Col className="signIn__sidePic" md={12}></Col>
    </Row>
  );
}
