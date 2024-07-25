import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../Assets/LOGO.png";
import {
  UilSignOutAlt,
  UilBars,
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilBriefcaseAlt,
  UilMapMarkerInfo,
  UilWaterGlass,
} from "@iconscout/react-unicons";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

export const Data = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/adminPage/dashboard",
  },
  {
    icon: UilUsersAlt,
    heading: "Quản lý nhân viên",
    path: "/adminPage/quan-li-nhan-vien",
  },
  {
    icon: UilClipboardAlt,
    heading: "Quản lý đơn hàng",
    path: "/adminPage/quan-li-don-hang",
  },
  {
    icon: UilMapMarkerInfo,
    heading: "Quản lý xuất xứ",
    path: "/adminPage/quan-li-xuat-xu",
  },
  {
    icon: UilBriefcaseAlt,
    heading: "Quản lý công ty sữa",
    path: "/adminPage/quan-li-cong-ty",
  },
  {
    icon: UilWaterGlass,
    heading: "Quản lý thương hiệu sữa",
    path: "/adminPage/quan-li-thuong-hieu",
  },
  // {
  //   icon: UilUsersAlt,
  //   heading: "Quản lý đối tượng sử dụng sữa",
  //   path: "/adminPage/quan-li-doi-tuong",
  // },
  {
    icon: UilPackage,
    heading: "Quản lý sản phẩm",
    path: "/adminPage/quan-li-san-pham",
  },
  {
    icon: UilChart,
    heading: "Doanh thu cửa hàng",
    path: "/adminPage/doanh-thu-cua-hang",
  },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/sign-in");
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="sidebar"
            variants={sidebarVariants}
            animate={window.innerWidth <= 768 ? `${expanded}` : ""}
            exit={{ left: "-60%" }}
            layout
          >
            {/* logo */}
            <div className="logo">
              <img src={Logo} alt="logo" />
              <span>
                Shop<span> Sữa</span>
              </span>
            </div>

            <div className="menu">
              {Data.map((item, index) => (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "menuItem active" : "menuItem"
                  }
                  key={index}
                  onClick={() => setSelected(index)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </NavLink>
              ))}
              {/* signoutIcon */}
              <div className="menuItem" onClick={handleLogout}>
                <UilSignOutAlt />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
