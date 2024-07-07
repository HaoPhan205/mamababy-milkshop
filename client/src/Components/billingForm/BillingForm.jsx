import React, { useState } from "react";
import "./BillingForm.scss";
import { Card, Button, Form, Input, Select } from "antd";

const { Option } = Select;

const BillingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Joginder",
    lastName: "Singh",
    academyName: "Gambotheemas",
    country: "India",
    address1: "#1234 Street No.45, Ward No.60, Phase 3",
    address2: "Shahid Karnail Singh Nagar Near Pakhowal Road",
    city: "Ludhiana",
    state: "Punjab",
    zipCode: "141013",
    phoneNumber: "+91123456789",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <Card className="container-form" title="Billing Details">
      <div className="edit-header">
        <h3>Edit Address</h3>
        <Button type="link" onClick={toggleFormVisibility}>
          {isFormVisible ? "-" : "+"}
        </Button>
      </div>
      {isFormVisible && (
        <Form onSubmit={handleSubmit} layout="vertical">
          {[
            "firstName",
            "lastName",
            "academyName",
            "country",
            "address1",
            "address2",
            "city",
            "state",
            "zipCode",
            "phoneNumber",
          ].map((field, index) => (
            <Form.Item
              key={index}
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              required
            >
              {field === "country" ? (
                <Select
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={(value) =>
                    handleChange({ target: { name: field, value } })
                  }
                >
                  <Option value="India">India</Option>
                  {/* Add other countries as needed */}
                </Select>
              ) : (
                <Input
                  type={field === "phoneNumber" ? "tel" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              )}
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      )}
      <div className="address-display">
        <p>
          {formData.firstName} {formData.lastName}
          <br />
          {formData.address1},<br />
          {formData.address2},<br />
          {formData.city}, {formData.state}, {formData.zipCode}
          <br />
          {formData.country}
        </p>
      </div>
    </Card>
  );
};

export default BillingForm;
