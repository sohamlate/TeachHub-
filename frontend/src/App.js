import React from "react";
import Publication from "./component/Publication";
import Register from "./component/Resister";
import Login from "./component/Login";
import Experience from "./component/Experience";
import { Route, Routes } from "react-router-dom";
import Home from "../src/component/Home";
import Header from "../src/component/Navbar"

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  // const [user, setUser] = useState({});  // Store logged-in user data
  // const navigate = useNavigate();  // Navigation hook
 
  
  // useEffect(() => { 
  //   const autoLogin = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       // if (!token) {
  //       //   navigate("/login"); 
  //       // }

  //       const response = await axios.get("https://huehub-vyrf-git-main-soham-lates-projects.vercel.app/api/v1/auth/autoLogin", {
  //         headers: { Authorization: `${token}` },
  //       });
      
  //       if (response.data.success) {
  //         localStorage.setItem("user", JSON.stringify(response.data.data));
  //         setUser(response.data.data);
  //       } else {
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.error("Auto login error:", error);
  //     }
  //   };

  //   autoLogin(); 
  // }, []);

  // // Update login state based on user data
  // useEffect(() => {
  //   if (user && Object.keys(user).length > 0) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [user]);
  // const user = {};

  return( 
    <div className="bg-[#eff6ff]">
        <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </div>
  );
};

export default App;
