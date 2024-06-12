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

import "./SignIn.scss";
import Logo from "../../Components/logo/Logo";

export default function SignIn() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row className="signIn">
      <Col md={12} className="signIn__card">
        <Logo />
        <Card style={{ width: 500 }} className="signIn__card__detail">
          <Form
            name="normal_login"
            className="login-form signIn__card__detail__input"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
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
              </ConfigProvider>
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ fontFamily: "Gantari" }}>
                  Remember me
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
                        defaultBg: "#FF4F28",
                        defaultColor: "white",
                        defaultHoverBg: "black",
                        defaultHoverBorderColor: "black",
                        defaultHoverColor: "white",
                        defaultHoverColor: "white",
                        defaultActiveBg:"#FF4F28",
                        activeBorderColor:"#FF4F28",
                        defaultActiveColor:'white',
                        defaultActiveBorderColor:'#FF4F28'
                      },
                    },
                  }}
                >
                  <Button
                  className="signIn__card__detail__options__option"
                    htmlType="submit"
                    style={{textTransform:'uppercase', fontWeight:'500', fontSize:'1.2em'}}
                  >
                    Sign in
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
                        defaultActiveBg:"black",
                        activeBorderColor:"black",
                        defaultActiveColor:'white',
                         defaultActiveBorderColor:'#FF4F28'
                      },
                    },
                  }}
                >
                  <Button
                    className="signIn__card__detail__options__option"
                    
                  >
                    <FcGoogle /> Sign in with Google
                  </Button>
                </ConfigProvider>
              </div>
            </Form.Item>
          </Form>
          <p>
            Or&nbsp;
            <Link to="/forgot-password" style={{ color: "#FF4F28" }}>
              {" "}
              Forgot Password
            </Link>
          </p>
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Link to="/sign-up" style={{ color: "#FF4F28" }}>
              {" "}
              Sign Up
            </Link>
          </p>  
        </Card>
      </Col>
      <Col className="signIn__sidePic" md={12}></Col>
    </Row>
  );
}
