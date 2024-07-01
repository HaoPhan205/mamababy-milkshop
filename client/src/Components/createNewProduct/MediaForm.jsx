import React, { useState } from 'react';
import { Tabs, Upload, Typography, message, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './MediaForm.scss';

const { Title } = Typography;
const { Dragger } = Upload;

const MediaForm = () => {
  const [providerType, setProviderType] = useState('html5');
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleProviderChange = (key) => {
    setProviderType(key);
  };

  const handleUpload = ({ file }) => {
    if (file.type === 'video/mp4') {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      message.success(`${file.name} file uploaded successfully.`);
    } else {
      message.error(`${file.name} is not a valid video file.`);
    }
  };

  const handleThumbnailUpload = ({ file }) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      message.success(`${file.name} file uploaded successfully.`);
    } else {
      message.error(`${file.name} is not a valid image file.`);
    }
  };

  const draggerProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false,
    onChange: handleUpload,
    showUploadList: false,
  };

  const thumbnailDraggerProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false,
    onChange: handleThumbnailUpload,
    showUploadList: false,
  };

  const tabItems = [
    {
      key: 'html5',
      label: 'HTML5(MP4)',
      children: (
        <div>
          <div className="upload-section">
            <Title level={5}>Upload Preview Video*</Title>
            <Dragger {...draggerProps} className="custom-dragger">
              <p className="ant-upload-drag-icon">
                <InboxOutlined className="custom-icon" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Supports: .mp4</p>
            </Dragger>
            {videoUrl && (
              <div className="video-preview">
                <video width="100%" height="200px" controls src={videoUrl} />
              </div>
            )}
          </div>
          <div className="thumbnail-section">
            <Title level={5}>Course Thumbnail*</Title>
            <Dragger {...thumbnailDraggerProps} className="custom-dragger">
              {thumbnailUrl ? (
                <img src={thumbnailUrl} alt="Thumbnail" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="custom-icon" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Supports: jpg, jpeg, or png</p>
                </>
              )}
            </Dragger>
          </div>
        </div>
      ),
    },
    {
      key: 'youtube',
      label: 'YouTube',
      children: (
        <div>
          <div className="upload-section">
            <Title level={5}>Upload Preview Video*</Title>
            <Input placeholder="YouTube video URL" />
          </div>
          <div className="thumbnail-section">
            <Title level={5}>Course Thumbnail*</Title>
            <Dragger {...thumbnailDraggerProps} className="custom-dragger">
              {thumbnailUrl ? (
                <img src={thumbnailUrl} alt="Thumbnail" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="custom-icon" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Supports: jpg, jpeg, or png</p>
                </>
              )}
            </Dragger>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="media-form">
      <Title level={4}>Media</Title>
      <Tabs defaultActiveKey="html5" onChange={handleProviderChange} items={tabItems} className="media-tabs" />
    </div>
  );
};

export default MediaForm;
