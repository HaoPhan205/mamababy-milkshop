import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
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
import { useUsers } from "../../Hooks/useUsers";
import "./SignIn.scss";
import Logo from "../../Components/logo/Logo";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const { onLogIn } = useUsers();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await onLogIn(username, password);
    setLoading(false);
  };

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
            onSubmit={handleSubmit}
          >
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
                className="signIn__card__detail__input__detail"
                prefix={
                  <UserOutlined
                    style={{ marginRight: "1.5em" }}
                    className="site-form-item-icon"
                  />
                }
                placeholder="Tài khoản "
                value={username}
                onChange={(e) => setPassword(e.target.value.trim())}
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
              <ConfigProvider
                theme={{
                  components: {
                    Input: {
                      hoverBorderColor: "none",
                      activeBorderColor: "none",
                    },
                  },
                }}
              >
                <Input.Password
                  className="signIn__card__detail__input__detail"
                  type="password"
                  placeholder="Mật khẩu của bạn"
                  prefix={
                    <LockOutlined
                      style={{ marginRight: "1.5em" }}
                      className="site-form-item-icon"
                    />
                  }
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </ConfigProvider>
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ fontFamily: "Gantari", color: "#ff469e" }}>
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
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: "1.2em",
                    }}
                    type="submit"
                  >
                    <Spin spinning={loading}>Đăng nhập</Spin>
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
                  <Button className="signIn__card__detail__options__option">
                    <FcGoogle />{" "}
                    <Spin spinning={loading}>Đăng nhập với Google</Spin>
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
