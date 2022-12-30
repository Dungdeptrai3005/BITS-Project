import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

// 1. Components
import NavHeader from "./components/nav-bar/NavHeader";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component"
import Profile from "./components/profile.component"
import BoardUser from "./components/UserBoard.component"
import BoardAdmin from "./components/AdminBoard.component"
import {history} from "./helpers/history"
import Course from "./components/course/course.component";
import CourseList from "./components/course/courseList.component"
import LessonCourse from "./components/course/lessonsCourse.component"
import CreateQuestion from "./components/questions/createQuestion.component"
import ListQuestion from "./components/questions/listQuestion.component";
import TestCourse from "./components/course/testCourse.component";
import ShowLesson from "./components/lesson/showLesson.component";
import ListCourse from "./components/lesson/listCourse.component";
import Footer from "./components/nav-bar/Footer";


function App() {
  return (
    //Route
    <Router history ={history}>
      <NavHeader/>
      <div className='mainContent'>
        <Routes>    
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/user" element={<BoardUser/>}/>
          <Route path="/home/:id" element={<LessonCourse/>}/>
          <Route path="/home/:id/test" element={<TestCourse/>}/>
          <Route path="/home/:id/lesson" element={<ShowLesson/>}/>
          <Route path="/admin/dashBoard" element={<BoardAdmin/>}/>
          <Route path="/admin/createCourse" element={<BoardAdmin/>}/>
          <Route path="/admin/coures/:id" element={<Course/>}/>
          <Route path="/admin/course" element={<CourseList/>}/>
          <Route path="/admin/question" element={<ListQuestion/>}/>
          <Route path="/admin/addQuestion" element={<CreateQuestion/>}/>
          <Route path="/admin/lesson" element={<ListCourse/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;