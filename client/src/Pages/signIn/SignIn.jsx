import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Col, Spin, Divider } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.scss";
import Logo from "../../Components/logo/Logo";
import { useUsers } from "../../Services/Hooks/useUsers";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { onLogIn } = useUsers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await onLogIn(email, password);
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
            <Form.Item name="email">
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
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </Form.Item>
            <Form.Item name="password">
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
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="signIn__card__detail__options__option"
                htmlType="submit"
                style={{
                  fontWeight: "500",
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                }}
              >
                <Spin spinning={loading}>Đăng nhập</Spin>
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
        </Card>
      </Col>
      <Col className="signIn__sidePic" md={12}></Col>
    </Row>
  );
};

export default SignIn;
