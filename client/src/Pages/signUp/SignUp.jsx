import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
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
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";

import "./SignUp.scss";
import Logo from "../../Components/logo/Logo";

export default function SignUp() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <Row className="signUp">
      <Col md={12} className="signUp__card">
        <Logo />
        <Card style={{ width: 500 }} className="signUp__card__detail">
          <Form
            name="normal_login"
            className="login-form signUp__card__detail__input"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
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
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
                style={{ width: "49%" }}
              >
                <Input
                  className="signUp__card__detail__input__detail"
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
                style={{ width: "49%" }}
              >
                <Input
                  className="signUp__card__detail__input__detail"
                  placeholder="Last Name"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                className="signUp__card__detail__input__detail"
                prefix={
                  <UserOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                  style: {
                    fontFamily: "Gantari",
                  },
                },
              ]}
            >
              <Input.Password
                className="signUp__card__detail__input__detail"
                type="password"
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
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                  style: {
                    fontFamily: "Gantari",
                  },
                },
              ]}
            >
              <Input.Password
                className="signUp__card__detail__input__detail"
                type="password"
                placeholder="Re-enter password"
                prefix={
                  <LockOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Form.Item valuePropName="unchecked" noStyle>
                <Checkbox
                  style={{ fontFamily: "Gantari" }}
                  onClick={() => setIsChecked(!isChecked)}
                >
                  Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
                </Checkbox>
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
                    disabled={isChecked}
                  >
                    Sign Up
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
                        defaultHoverColor: "white",
                        defaultActiveBg: "black",
                        activeBorderColor: "black",
                        defaultActiveColor: "white",
                        defaultActiveBorderColor: "#ff469e",
                      },
                    },
                  }}
                >
                  <Button
                    className="signUp__card__detail__options__option"
                    disabled={isChecked}
                  >
                    <FcGoogle /> Sign up with Google
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
