import React from "react";
import Publication from "./component/Publication";
import Register from "./component/Resister";
import Login from "./component/Login";
import Experience from "./component/Experience";
import { Route, Routes } from "react-router-dom";
import Home from "../src/component/Home";
import Header from "../src/component/Navbar"
import Education from "../src/component/Education";
import Contact from "../src/component/Contact";
import EditProfile from "./component/editProfile";

const App = () => {
  
  const token = localStorage.getItem("token");
  

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user<"fdsf");


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
        <Route path="/contact" element={<Contact />} />
         <Route path="/editprofile" element={<EditProfile user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
