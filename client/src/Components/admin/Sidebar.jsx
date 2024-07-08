import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "./imgs/logo.png";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "./Data/Data";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  console.log(window.innerWidth);
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
            initial={{ left: "-60%" }}
            animate={window.innerWidth <= 768 ? `${expanded}` : ""}
            exit={{ left: "-60%" }}
            layout
          >
            {/* logo */}
            <div className="logo">
              <img src={Logo} alt="logo" />
              <span>
                Sh<span>o</span>ps
              </span>
            </div>

            <div className="menu">
              {SidebarData.map((item, index) => {
                return (
                  <div
                    className={
                      selected === index ? "menuItem active" : "menuItem"
                    }
                    key={index}
                    onClick={() => setSelected(index)}
                  >
                    <item.icon />
                    <span>{item.heading}</span>
                  </div>
                );
              })}
              {/* signoutIcon */}
              <div className="menuItem">
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
