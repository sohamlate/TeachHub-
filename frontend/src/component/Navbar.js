import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { greeting, settings } from "../portfolio.js";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        setIsAdmin(true);
      } catch (error) {
        console.error("Token decoding failed", error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleQuizRedirect = () => {
    if (isAdmin) {
      navigate("/admin-quiz");
    } else {
      navigate("/quiz");
    }
  };

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/cv", name: "CV" },
 
    { path: "/study-material", name: "Resources" },
    { path: "/expert", name: "Invited as Expert" },
    { path: "/subject", name: "Subjects Taught" },   
    { path: "/student-dashboard", name: "Student Dashboard" },
    { path: "/contact", name: "Contact Me" },
  ];
  

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* <span className="text-xl font-bold text-blue-800">
              Study Portal
            </span> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition ${
                    isActive ? "text-blue-800 font-bold" : "text-blue-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={menuItemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition ${
                          isActive ? "text-blue-800 font-bold" : "text-blue-600"
                        }`
                      }
                      onClick={() => {
                        setMenuOpen(false);
                        if (item.onClick) item.onClick();
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
                {token && (
                  <motion.div
                    variants={menuItemVariants}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Header;
