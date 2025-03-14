import React from "react";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { greeting, settings } from "../portfolio.js";
import { chosenTheme } from "../theme";


const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    
      <div className="w-full px-4 py-5 mx-auto flex items-center justify-between max-w-5xl">
        <NavLink to={settings.isSplash ? "/splash" : "/home"} className="text-2xl font-bold flex items-center">
          <span style={{ color: chosenTheme.text }}> &lt;</span>
          <span className="px-2" style={{ color: chosenTheme.text }}>{greeting.logo_name}</span>
          <span style={{ color: chosenTheme.text }}>/&gt;</span>
        </NavLink>
        <input type="checkbox" id="menu-btn" className="hidden peer" />
        <label htmlFor="menu-btn" className="block cursor-pointer md:hidden">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </label>
        <ul className="hidden md:flex space-x-6 text-lg" style={{ backgroundColor: chosenTheme.body }}>
          {[
            { path: "/", name: "Home" },
            { path: "/education", name: "Education" },
            { path: "/experience", name: "Experience" },
            { path: "/publication", name: "Publication" },
            { path: "/opensource", name: "Open Source" },
            { path: "/contact", name: "Contact Me" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="px-4 py-2 rounded-md hover:bg-gray-200 transition"
                style={{ color: chosenTheme.text }}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Header;