import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../Assets/LOGO.png";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "./Data/Data";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

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
              {SidebarData.map((item, index) => {
                return (
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
                );
              })}
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
