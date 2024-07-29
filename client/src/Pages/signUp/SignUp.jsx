import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
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
  Typography,
} from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Logo from "../../Components/logo/Logo";
import { useUsers } from "../../Services/Hooks/useUsers";
import "./SignUp.scss";

const { Text } = Typography;

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[\p{L}\s]+$/u, "Full name must contain only letters and spaces")
    .required("Please input your full name!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please input your email!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please input your password!"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "The two passwords that you entered do not match!"
    )
    .required("Please confirm your password!"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Please input your phone number!"),
  agree: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { onSignup } = useUsers();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await onSignup(
        values.fullName,
        values.email,
        values.password,
        values.phone
      );
      setLoading(false);
      navigate("/sign-in");
    },
  });

  return (
    <Row className="signUp">
      <Col md={12} className="signUp__card">
        <Logo />
        <Card style={{ width: 500 }} className="signUp__card__detail">
          <Form
            name="normal_signup"
            className="signup-form signUp__card__detail__input"
            initialValues={{ remember: true }}
            onFinish={formik.handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="fullName"
              help={
                formik.touched.fullName && formik.errors.fullName
                  ? formik.errors.fullName
                  : ""
              }
              validateStatus={
                formik.touched.fullName && formik.errors.fullName ? "error" : ""
              }
            >
              <Input
                className="signUp__card__detail__input__detail"
                placeholder="Tên của bạn"
                name="fullName"
                prefix={
                  <UserOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              help={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""
              }
              validateStatus={
                formik.touched.phone && formik.errors.phone ? "error" : ""
              }
            >
              <Input
                className="signUp__card__detail__input__detail"
                placeholder="Số điện thoại của bạn"
                name="phone"
                prefix={
                  <PhoneOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            </Form.Item>
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
                className="signUp__card__detail__input__detail"
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
                autoComplete="off"
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
                className="signUp__card__detail__input__detail"
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
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              help={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
              validateStatus={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "error"
                  : ""
              }
            >
              <Input.Password
                className="signUp__card__detail__input__detail"
                placeholder="Nhập lại mật khẩu"
                prefix={
                  <LockOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                name="agree"
                checked={formik.values.agree}
                onChange={formik.handleChange}
              >
                Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
              </Checkbox>
              {formik.touched.agree && formik.errors.agree ? (
                <Text type="danger">{formik.errors.agree}</Text>
              ) : null}
            </Form.Item>
            <Form.Item>
              <div className="signUp__card__detail__options">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        borderRadius: "20px",
                        defaultBg: "#ff469e",
                        defaultColor: "white",
                        defaultHoverBg: "#ff469e",
                        defaultHoverBorderColor: "black",
                        defaultHoverColor: "white",
                        defaultActiveBg: "#ff469e",
                        activeBorderColor: "#ff469e",
                        defaultActiveColor: "white",
                      },
                    },
                  }}
                >
                  <Button
                    className="signUp__card__detail__options__option"
                    htmlType="submit"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: "1.2em",
                      defaultActiveBg: "#ff469e",
                      defaultBg: "#ff469e",
                    }}
                    loading={loading}
                    disabled={
                      !formik.values.fullName ||
                      !formik.values.email ||
                      !formik.values.password ||
                      !formik.values.confirmPassword ||
                      !formik.values.phone ||
                      !formik.values.agree ||
                      loading
                    }
                  >
                    Đăng ký
                  </Button>
                </ConfigProvider>
              </div>
            </Form.Item>
          </Form>
          <Divider />
          <p>
            Bạn đã có tài khoản? &nbsp;
            <Link to="/sign-in" style={{ color: "#ff469e" }}>
              {" "}
              Đăng nhập
            </Link>
          </p>
        </Card>
      </Col>
      <Col className="signUp__sidePic" md={12}></Col>
    </Row>
  );
}
