import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../config/axios";

const ImageUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = ({ file }) => {
    setFile(file.originFileObj);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Upload successful!");
      console.log("Uploaded Image URL:", response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Upload failed!");
    }
  };

  return (
    <div>
      <Upload beforeUpload={() => false} onChange={handleFileChange}>
        <Button icon={<UploadOutlined />}>Select Image</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        style={{ marginTop: 16 }}
      >
        Upload
      </Button>
    </div>
  );
};

export default ImageUploader;
