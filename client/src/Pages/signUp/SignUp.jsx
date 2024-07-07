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
  Typography,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./SignUp.scss";
import { useFormik } from "formik";
import Logo from "../../Components/logo/Logo";
import {
  register,
  resetRegisterSuccess,
  clearError,
} from "../../Store/action/authActions";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

const { Text } = Typography;

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[\p{L}\s]+$/u, "First name must contain only letters and spaces")
    .required("Please input your first name!"),
  lastname: Yup.string()
    .matches(/^[\p{L}\s]+$/u, "Last name must contain only letters and spaces")
    .required("Please input your last name!"),
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
  agree: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, registerSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerSuccess) {
      navigate("/sign-in");
      dispatch(resetRegisterSuccess());
    }
  }, [registerSuccess, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  return (
    <Row className="signUp">
      <Col md={12} className="signUp__card">
        <Logo />
        <Card style={{ width: 500 }} className="signUp__card__detail">
          <Form
            name="normal_login"
            className="login-form signUp__card__detail__input"
            initialValues={{ remember: true }}
            onFinish={formik.handleSubmit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Form.Item
                name="firstname"
                help={
                  formik.touched.firstname && formik.errors.firstname
                    ? formik.errors.firstname
                    : ""
                }
                validateStatus={
                  formik.touched.firstname && formik.errors.firstname
                    ? "error"
                    : ""
                }
                style={{ width: "49%" }}
              >
                <Input
                  className="signUp__card__detail__input__detail"
                  placeholder="Tên"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                help={
                  formik.touched.lastname && formik.errors.lastname
                    ? formik.errors.lastname
                    : ""
                }
                validateStatus={
                  formik.touched.lastname && formik.errors.lastname
                    ? "error"
                    : ""
                }
                style={{ width: "49%" }}
              >
                <Input
                  className="signUp__card__detail__input__detail"
                  placeholder="Họ"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>
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
                type="password"
                placeholder="Nhập lại mật khẩu!"
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
              />
            </Form.Item>
            <Form.Item>
              <Form.Item valuePropName="unchecked" noStyle>
                <Checkbox
                  style={{ fontFamily: "Gantari" }}
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
                    className="signUp__card__detail__options__option"
                    htmlType="submit"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: "1.2em",
                    }}
                    loading={loading}
                    disabled={!formik.values.agree}
                  >
                    Đăng ký
                  </Button>
                </ConfigProvider>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        borderRadius: "20px",
                        defaultBg: "white",
                        defaultColor: "black",
                        defaultHoverBg: "black",
                        defaultHoverBorderColor: "black",
                        defaultHoverColor: "white",
                        defaultActiveBg: "black",
                        activeBorderColor: "black",
                        defaultActiveColor: "white",
                        defaultActiveBorderColor: "#FF4F28",
                      },
                    },
                  }}
                >
                  <Button
                    className="signUp__card__detail__options__option"
                    style={{
                      fontSize: "1.2em",
                    }}
                  >
                    <FcGoogle /> Đăng ký với Google
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
