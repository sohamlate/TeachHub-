import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { greeting, settings } from "../portfolio.js";
import { chosenTheme } from "../theme";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-transparent"
    >
      <div className="w-full px-4 py-5 mx-auto flex items-center justify-between max-w-5xl">
      
        <NavLink
          to={settings.isSplash ? "/splash" : "/home"}
          className="text-2xl font-bold flex items-center"
        >
          <span style={{ color: chosenTheme.text }}> &lt;</span>
          <span className="px-2" style={{ color: chosenTheme.text }}>
            {greeting.logo_name}
          </span>
          <span style={{ color: chosenTheme.text }}>/&gt;</span>
        </NavLink>

       
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col space-y-1"
        >
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>

      
        <ul
          className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 p-5 md:p-0 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {[
            { path: "/", name: "Home" },
            { path: "/experience", name: "Experience" },
            { path: "/education", name: "Education" },
            { path: "/publication", name: "Publication" },
            { path: "/contact", name: "Contact Me" },
          ].map((item) => (
            <li key={item.path} className="text-lg">
              <NavLink
                to={item.path}
                className="px-4 py-2 rounded-md hover:bg-gray-200 transition"
                style={{ color: chosenTheme.text }}
                onClick={() => setMenuOpen(false)} 
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {token && (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default Header;
