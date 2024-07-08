import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Tabs } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "../updateProfile/updateProfile.scss";
import { Switch, Checkbox, List, Modal } from "antd";

const { TabPane } = Tabs;

const Donhang = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      // Replace with actual API call
      const userData = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              firstName: "Joginder",
              lastName: "Singh",
              headline: "I am a Web Designer",
              description: "",
            }),
          1000
        )
      );
      form.setFieldsValue(userData);
    };

    fetchUserData();
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    // Simulate sending data to an API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    message.success("Profile updated successfully!");
  };

  return (
    <div className="profile-update">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Account" key="1">
          <h2>Your Account</h2>
          <p>
            This is your public presence . You need a account to upload your
            paid courses, comment on courses, purchased by students, or earning.
          </p>
          <h3>Basic Profile</h3>
          <p>Add information about yourself</p>
          <Form
            form={form}
            name="profile-update"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="headline"
              label="Professional Headline"
              rules={[
                { required: true, message: "Please input your headline!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={4}
                placeholder="Write a little description about you..."
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="custom-button"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Notification" key="2">
          <h2>Notifications - Choose when and how to be notified</h2>
          <Form layout="vertical">
            <Form.Item label="Email Notifications">
              <Switch className="custom-switch" defaultChecked />
            </Form.Item>
            <Form.Item label="Push Notifications">
              <Switch className="custom-switch" />
            </Form.Item>
            <Form.Item label="About update">
              <Checkbox className="custom-checkbox">
                Receive updates about our products and features
              </Checkbox>
            </Form.Item>
            <Form.Item label="Feedback and bug reports">
              <Checkbox className="custom-checkbox">
                Receive feedback and bug reports
              </Checkbox>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Donhang;
