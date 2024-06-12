import React from 'react';
import './Footer.scss'; 
import { TikTokOutlined, YoutubeOutlined, InstagramOutlined, TwitterOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
const Footer = () => {
  const languageMenu = (
    <Menu>
      <Menu.Item key="en">
        <a href="#en">English</a>
      </Menu.Item>
      <Menu.Item key="es">
        <a href="#es">Spanish</a>
      </Menu.Item>
      <Menu.Item key="fr">
        <a href="#fr">French</a>
      </Menu.Item>
      <Menu.Item key="vn">
        <a href="#vn">Tiếng Việt</a>
      </Menu.Item>
      <Menu.Item key="kr">
        <a href="#kr">Korea</a>
      </Menu.Item>
      <Menu.Item key="cn">
        <a href="#cn">China</a>
      </Menu.Item>
      <Menu.Item key="en">
        <a href="#en">English</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <ul>
            <li><a href="#About">About</a></li>
            <li><a href="#Blog">Blog</a></li>
            <li><a href="#Carrer">Carrer</a></li>
            <li><a href="#Press">Press</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <ul>
            <li><a href="#Help">Help</a></li>
            <li><a href="#Advertise">Advertise</a></li>
            <li><a href="#Developers">Developers</a></li>
            <li><a href="#Contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <ul>
            <li><a href="#Copyrightpolicy">Copyright Policy</a></li>
            <li><a href="#Terms">Terms</a></li>
            <li><a href="#PrivacyPolicy">Privacy Policy</a></li>
            <li><a href="#Sitemap">Sitemap</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <div className="buttons">
            <Button type="primary" danger size='large'>
              Tech on
            </Button>
            <Dropdown overlay={languageMenu} trigger={['click']} className="language-dropdown">
              <Button type="default" size='large'>
                Language
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="icon">
          <TikTokOutlined />
          <YoutubeOutlined />
          <InstagramOutlined />
          <TwitterOutlined />
          <GooglePlusOutlined />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

