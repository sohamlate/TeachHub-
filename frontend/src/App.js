import React from "react";
import Publication from "./component/Publication";
import Register from "./component/Resister";
import Login from "./component/Login";
import Experience from "./component/Experience";
import { Route, Routes } from "react-router-dom";
import Home from "../src/component/Home";
import Header from "../src/component/Navbar"
import Education from "../src/component/Education";
import Award from "../src/component/Awards";
import Contact from "../src/component/Contact";
import EditProfile from "./component/editProfile";
import StudyMaterials from "./component/StudyMaterial";
import DeliveredSessions from "./component/DeliveredSessions";
import AdminQuiz from "./component/AdminQuiz";
import AttemptQuiz from "./component/AttemptQuiz";
import QuizDetail from "./component/QuizDetail";
import QuizList from "./component/QuizList";
import CV from "./component/CV"; 
import StudentDashboard from './component/StudentDashboard'
import SubjectTaught from './component/SubjectTaught'


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
        <Route path="/award" element={<Award />} />
        <Route path="/study-material" element={<StudyMaterials />} />
        <Route path="/expert" element={<DeliveredSessions />} />
        <Route path="/contact" element={<Contact />} />
         {/* <Route path="/editprofile" element={<EditProfile user={user} />} /> */}
        <Route path="/quiz" element={<AttemptQuiz />} />
        <Route path="/quiz-user/:quizId" element={<QuizList />} />
        <Route path="/admin-quiz" element={<AdminQuiz />} />
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/subject" element={<SubjectTaught />} />

      </Routes>
    </div>
  );
};

export default App;
