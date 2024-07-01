import React from "react";
import "./Footer.scss";

import { Link } from "react-router-dom";
import Logo from "../../logo/Logo";
import free from "../../../Assets/free-call.png";

export default function Footer() {
  const phoneNumber = "0354019580";
  return (
    <div className="footer">
      <div className="footer__info">
        <ul>
          <div className="footer__info__logo">
            <Logo />
          </div>
          <p>Công Ty Cổ Phần MamaBaby</p>

          <div className="footer__free">
            <p>
              Mua hàng và CSKH:{" "}
              <a href={`tel:${phoneNumber}`} className="header__phone">
                {phoneNumber}
              </a>
            </p>
            <img src={free} alt="" className="header__freeIcon" />
          </div>
          <p>
            Địa chỉ: Lô E2a-7, Đường D1, Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí
            Minh{" "}
          </p>
          <p>Email: mamababy@gmail.com</p>
        </ul>
      </div>

      <div className="footer__info2">
        <ul>
          <p>Về MamaBaby</p>
          <li>
            <Link className="footer__content" to="/gioi-thieu">
              Giới thiệu về MamaBaby
            </Link>
          </li>
          <li>
            <Link className="footer__content" to="/chinh-sach-bao-mat">
              Chính sách bảo mật
            </Link>
          </li>
          <li>
            <Link className="footer__content" to="/dieu-khoan-chung">
              Điều khoản chung
            </Link>
          </li>
        </ul>
        <ul>
          <p>Hỗ Trợ Khách Hàng</p>
          <li>
            <Link className="footer__content" to="/chinh-sach-giao-hang">
              Mua & giao nhận Online
            </Link>
          </li>
          <li>
            <Link className="footer__content" to="/chinh-sach-thanh-toan">
              Qui định & hình thức thanh toán
            </Link>
          </li>
          <li>
            <Link className="footer__content" to="/chinh-sach-bao-hanh">
              Bảo hành & Bảo trì
            </Link>
          </li>
          <li>
            <Link className="footer-content" to="/chinh-sach-doi-tra-hang">
              Đổi trả & Hoàn tiền
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
