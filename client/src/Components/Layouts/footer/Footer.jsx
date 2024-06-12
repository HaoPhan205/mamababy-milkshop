import React from 'react';
import './Footer.scss'; 
import { TikTokOutlined, YoutubeOutlined, InstagramOutlined, TwitterOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
const Footer = () => {

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

