import React from "react";
import Publication from "./component/Publication";
import Register from "./component/Resister";
import Login from "./component/Login";
import Experience from "./component/Experience";
import { Route, Routes } from "react-router-dom";
import Home from "../src/component/Home";
import Header from "../src/component/Navbar"
import Education from "../src/component/Education";

const App = () => {
  

  return( 
    <div className="bg-[#eff6ff]">
        <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </div>
  );
};

export default App;
